import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameboardReducer from '../features/gameboard/GameboardSlice';
import gameStatusReducer from '../features/gamestatus/GamestatusSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        gameboard: gameboardReducer,
        gamestatus: gameStatusReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
