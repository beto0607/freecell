import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card, CardsBuffers, CardsBuffersKeys, CardsStacks, CardsStacksKeys, CardSuit, DealtCards } from "../../models/cards";
import { compareCards } from "../../utils/card.utils";
import { getColumnIndexForCard } from "../../utils/column.utils";
import { dealCards, initDeck, isCardMovableToBuffer, isCardMovableToColumn, isCardMovableToStack, moveCardToColumn, removeCard } from "../../utils/gameboard.utils";

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
            const canPutCardInColumn = isCardMovableToColumn(state.board, state.buffers, state.selectedCard, targetColumnIndex);
            if (canPutCardInColumn) {
                moveCardToColumn(state.board, state.buffers, state.stacks, state.selectedCard, targetColumnIndex);
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
            if (!state.buffers[bufferId] && isCardMovableToBuffer(state.board, state.stacks, state.selectedCard)) {
                state.buffers[bufferId] = state.selectedCard;
                removeCard(state.board, state.stacks, undefined, state.selectedCard);
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
            if (isCardMovableToStack(state.board, state.buffers, state.stacks, stackId, state.selectedCard)) {
                state.stacks[stackId]!.push(state.selectedCard);
                removeCard(state.board, undefined, state.buffers, state.selectedCard);
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
