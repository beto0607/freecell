import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card, CardsBuffers, CardsBuffersKeys, CardsStacks, CardsStacksKeys, CardSuit, DealtCards } from "../../models/cards.d";
import { isCardInBuffers, isCardMovableToBuffer, removeCardFromBuffers } from "../../utils/buffers.utils";
import { compareCards } from "../../utils/card.utils";
import { getColumnIndexForCard } from "../../utils/column.utils";
import { dealCards, initDeck } from '../../utils/deck.utils';
import { isCardMovableToColumn, moveCardToColumn, removeCard } from "../../utils/gameboard.utils";
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
        deselectCard: (state) => {
            state.selectedCard = undefined;
        },
        selectCard: (state, action: PayloadAction<Card | undefined>) => {
            if (!state.selectedCard) {
                state.selectedCard = action.payload;
                return;
            }
            if (compareCards(action.payload, state.selectedCard)) {
                state.selectedCard = undefined;
                return;
            }
            const targetColumnIndex = getColumnIndexForCard(state.board, action.payload);
            if (targetColumnIndex === -1) {
                return;
            }

            if (isCardInBuffers(state.buffers, state.selectedCard)) {
                if (isCardMovableToColumn(state.board, state.selectedCard, targetColumnIndex)) {
                    moveCardToColumn(state.board, state.selectedCard, targetColumnIndex);
                    removeCardFromBuffers(state.buffers, state.selectedCard);
                };
                state.selectedCard = action.payload;
                return;
            }
            if (isCardInStacks(state.stacks, state.selectedCard)) {
                if (isCardMovableToColumn(state.board, state.selectedCard, targetColumnIndex)) {
                    moveCardToColumn(state.board, state.selectedCard, targetColumnIndex);
                    removeCardFromStacks(state.stacks, state.selectedCard);
                }
                state.selectedCard = action.payload;
                return;
            }

            const canPutCardInColumn = isCardMovableToColumn(state.board, state.selectedCard, targetColumnIndex);
            if (canPutCardInColumn) {
                moveCardToColumn(state.board, state.selectedCard, targetColumnIndex);
                state.selectedCard = undefined;
                return;
            }
            state.selectedCard = action.payload;
        },
        bufferClicked: (state, { payload: { bufferId, card } }: PayloadAction<{ bufferId: CardsBuffersKeys, card: Card | undefined }>) => {
            if (!state.selectedCard) {
                state.selectedCard = card;
                return;
            }
            if (compareCards(card, state.selectedCard)) {
                state.selectedCard = undefined;
                return;
            }
            if (isCardMovableToBuffer(state.buffers, bufferId, state.selectedCard)) {
                state.buffers[bufferId] = state.selectedCard;
                removeCard(state.board, state.selectedCard);
            }
            state.selectedCard = card;
        },
        stackClicked: (state, { payload: { stackId } }: PayloadAction<{ stackId: CardsStacksKeys, card: Card | undefined }>) => {
            const card = state.stacks[stackId].at(-1);
            if (!state.selectedCard) {
                state.selectedCard = card;
                return;
            }
            if (compareCards(state.selectedCard, card)) {
                state.selectedCard = undefined;
                return;
            }
            if (isCardMovableToStack(state.stacks, stackId, state.selectedCard)) {
                state.stacks[stackId]!.push(state.selectedCard);
                removeCard(state.board, state.selectedCard);
            }
        }
    },
});

export const { initNewGame, deselectCard, selectCard, bufferClicked, stackClicked } = gameboardSlice.actions;

export const selectBoardInitialized = ({ gameboard }: RootState) => gameboard.boardInitialized;
export const selectStacks = ({ gameboard }: RootState) => gameboard.stacks;
export const selectBuffers = ({ gameboard }: RootState) => gameboard.buffers;
export const selectBoard = ({ gameboard }: RootState) => gameboard.board
export const selectSelectedCard = ({ gameboard }: RootState) => gameboard.selectedCard;


export default gameboardSlice.reducer;
