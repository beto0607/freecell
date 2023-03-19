import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initNewGame, selectBoardInitialized, selectGameEnded } from "../../features/gameboard/GameboardSlice";
import { BoardComponent } from "./Board/Board";
import { CardBufferComponent } from "./CardBuffer/CardBuffer";
import { CardStackComponent } from "./CardStack/CardStack";
import styles from './Gameboard.module.css';
import { GameStatusBarComponent } from "./GameStatusBar/GameStatusBar";

export const GameBoardComponent = () => {
    const dispatch = useAppDispatch();
    const gameInit = useAppSelector(selectBoardInitialized);
    const gameEnded = useAppSelector(selectGameEnded);
    useEffect(() => {
        if (gameEnded) {
            alert('you won... yay');
            return;
        }
        if (!gameInit) {
            dispatch(initNewGame());
        }


    }, [gameInit, gameEnded, dispatch]);

    if (!gameInit) {
        return (<div> Click on "Init new game"</div>)
    }

    return (
        <div className={styles.wrapper}>
        <div className={styles.header}>
            <GameStatusBarComponent />
            </div>
            <CardBufferComponent />
            <CardStackComponent />
            <div className={styles.board}>
                <BoardComponent />
            </div>
        </div>

    );
};

