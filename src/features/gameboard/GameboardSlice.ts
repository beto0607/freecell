import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "../../app/store";
import { Card, CardsBuffers, CardsBuffersKeys, CardsStacks, CardsStacksKeys, CardSuit, DealtCards } from "../../models/cards.d";
import { isCardInBuffers, isCardMovableToBuffer, removeCardFromBuffers } from "../../utils/buffers.utils";
import { compareCards } from "../../utils/card.utils";
import { getColumnIndexForCard } from "../../utils/column.utils";
import { dealCards, initDeck } from '../../utils/deck.utils';
import { isCardMovableToColumn, isSingleCardSelection, moveCardToColumn, removeCardFromBoard } from "../../utils/gameboard.utils";
import { isCardInStacks, isCardMovableToStack, removeCardFromStacks } from "../../utils/stacks.utils";

export interface GameboardState {
    stacks: CardsStacks;
    buffers: CardsBuffers;
    board: DealtCards; // 6 columns
    boardInitialized: boolean;
    selectedCard?: Card;
};

const initialStacks: CardsStacks = {
    [CardSuit.Club]: [],
    [CardSuit.Spade]: [],
    [CardSuit.Heart]: [],
    [CardSuit.Diamond]: [],
};

const initialBuffers: CardsBuffers = {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
}

const initialState: GameboardState = {
    stacks: initialStacks,
    buffers: initialBuffers,
    board: [],
    boardInitialized: false,
};


export const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState,
    reducers: {
        initNewGame: (state) => {
            state.stacks = initialStacks;
            state.buffers = initialBuffers;
            const deck = initDeck();
            state.board = dealCards(deck);
            state.boardInitialized = true;
        },
        selectCard: (state, action: PayloadAction<{ card: Card | undefined }>) => {
            console.log(action.payload);
            if (!state.selectedCard) {
                state.selectedCard = action.payload.card;
                return;
            }
            if (compareCards(action.payload.card, state.selectedCard)) {
                state.selectedCard = undefined;
                return;
            }
            const targetColumnIndex = getColumnIndexForCard(state.board, action.payload.card);
            if (targetColumnIndex === -1) {
                return;
            }

            if (isCardInBuffers(state.buffers, state.selectedCard)) {
                if (isCardMovableToColumn(state.board, state.selectedCard, targetColumnIndex)) {
                    moveCardToColumn(state.board, state.selectedCard, targetColumnIndex);
                    removeCardFromBuffers(state.buffers, state.selectedCard);
                };
                state.selectedCard = action.payload.card;
                return;
            }
            if (isCardInStacks(state.stacks, state.selectedCard)) {
                if (isCardMovableToColumn(state.board, state.selectedCard, targetColumnIndex)) {
                    moveCardToColumn(state.board, state.selectedCard, targetColumnIndex);
                    removeCardFromStacks(state.stacks, state.selectedCard);
                }
                state.selectedCard = action.payload.card;
                return;
            }

            const canPutCardInColumn = isCardMovableToColumn(state.board, state.selectedCard, targetColumnIndex);
            if (canPutCardInColumn) {
                moveCardToColumn(state.board, state.selectedCard, targetColumnIndex);
                state.selectedCard = undefined;
                return;
            }
            state.selectedCard = action.payload.card;
        },
        moveCard: (state, { payload: { card } }: PayloadAction<{ card: Card | undefined }>) => {
            if (!card) {
                return;
            }
            state.selectedCard = card;
            const stackId = card.suit as CardsStacksKeys;
            if (
                !isCardInStacks(state.stacks, state.selectedCard) &&
                isCardMovableToStack(state.stacks, stackId, state.selectedCard,)
            ) {
                removeCardFromBuffers(state.buffers, state.selectedCard);
                removeCardFromBoard(state.board, state.selectedCard);
                state.stacks[stackId]!.push(state.selectedCard);
            }
        },
        bufferSelected: (state, { payload: { bufferId, card } }: PayloadAction<{ bufferId: CardsBuffersKeys, card: Card | undefined }>) => {
            if (!state.selectedCard) {
                state.selectedCard = state.buffers[bufferId];
                return;
            }
            if (compareCards(state.buffers[bufferId], state.selectedCard)) {
                state.selectedCard = undefined;
                return;
            }
            if (!isCardMovableToBuffer(state.buffers, bufferId, state.selectedCard)) {
                state.selectedCard = state.buffers[bufferId] ?? card;
                return;
            }

            if (isCardInStacks(state.stacks, state.selectedCard)) {
                removeCardFromStacks(state.stacks, state.selectedCard);
            } else if (isSingleCardSelection(state.board, state.selectedCard)) {
                removeCardFromBoard(state.board, state.selectedCard);
            } else if (isCardInBuffers(state.buffers, state.selectedCard)) {
                removeCardFromBuffers(state.buffers, state.selectedCard);
            } else {

                state.selectedCard = state.buffers[bufferId] ?? card;
                return;
            }
            state.buffers[bufferId] = state.selectedCard;
        },
        stackSelected: (state, { payload: { stackId } }: PayloadAction<{ stackId: CardsStacksKeys, card: Card | undefined }>) => {
            const card = state.stacks[stackId].at(-1);
            if (!state.selectedCard) {
                state.selectedCard = card;
                return;
            }
            if (compareCards(card, state.selectedCard)) {
                state.selectedCard = undefined;
                return;
            }
            if (!isCardMovableToStack(state.stacks, stackId, state.selectedCard)) {
                state.selectedCard = card ?? state.selectedCard;
                return;
            }
            if (isCardInBuffers(state.buffers, state.selectedCard)) {
                removeCardFromBuffers(state.buffers, state.selectedCard);
            } else if (isSingleCardSelection(state.board, state.selectedCard)) {
                removeCardFromBoard(state.board, state.selectedCard);
            } else {
                state.selectedCard = card;
                return;
            }
            state.stacks[stackId]!.push(state.selectedCard);
        },
    },
});

export const { initNewGame, selectCard, bufferSelected, stackSelected } = gameboardSlice.actions;

export const selectBoardInitialized = ({ gameboard }: RootState) => gameboard.boardInitialized;
export const selectStacks = ({ gameboard }: RootState) => gameboard.stacks;
export const selectBuffers = ({ gameboard }: RootState) => gameboard.buffers;
export const selectBoard = ({ gameboard }: RootState) => gameboard.board
export const selectSelectedCard = ({ gameboard }: RootState) => gameboard.selectedCard;


export default gameboardSlice.reducer;
