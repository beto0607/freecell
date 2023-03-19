import { createSlice } from "@reduxjs/toolkit";


export interface GameStatusState {
    movements: number;
    timeMS: number;
    started: boolean;
    finished: boolean;
}

const initialState: GameStatusState = {
    timeMS: 0,
    started: false,
    finished: false,
    movements: 0,
};

export const gameStatusSlice = createSlice({
    name: 'gamestatus',
    initialState,
    reducers: {
        startGame: (state) => {
            state.finished = false;
            state.started = true;
        },
        finishGame: (state) => {
            state.finished = true;
        }
    },
    extraReducers: {

    }
});

export const { startGame, finishGame } = gameStatusSlice.actions;

export const selectGameStarted = ({gamestatus}:RootState)=>gamestatus.started;

export default gameStatusSlice.reducer;

