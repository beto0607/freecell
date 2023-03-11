import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card, DealtCards } from "../../models/cards";
import { dealCards, initDeck } from "../../utils/gameboard.utils";

export interface GameboardState {
    stack: Card[][]; // 4 stacks
    buffer: Card[]; // 4 cards
    board: DealtCards; // 6 columns
    boardInitialized: boolean;
    selectedCard?: Card;
};

const initialState: GameboardState = {
    stack: [[], [], [], []],
    buffer: [],
    board: [],
    boardInitialized: false,
};


export const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState,
    reducers: {
        initNewGame: (state) => {
            state.stack = [[], [], [], []];
            state.buffer = [];
            const deck = initDeck();
            state.board = dealCards(deck);
            state.boardInitialized = true;
        },
        selectCard: (state, action: PayloadAction<Card | undefined>) => {
            if (action.payload === state.selectedCard) {
                state.selectedCard = undefined;
                return;
            }
            state.selectedCard = action.payload;
        }
    },
});

export const { initNewGame, selectCard } = gameboardSlice.actions;

export const selectBoardInitialized = ({ gameboard }: RootState) => gameboard.boardInitialized;
export const selectStack = ({ gameboard }: RootState) => gameboard.stack;
export const selectBuffer = ({ gameboard }: RootState) => gameboard.buffer;
export const selectBoard = ({ gameboard }: RootState) => gameboard.board
export const selectSelectedCard = ({ gameboard }: RootState) => gameboard.selectedCard;


export default gameboardSlice.reducer;
