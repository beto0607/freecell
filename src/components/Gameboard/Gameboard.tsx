import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initNewGame, selectBoardInitialized } from "../../features/gameboard/GameboardSlice";
import { BoardComponent } from "./board/BoardComponent";
import { CardBufferComponent } from "./buffer/CardBuffer";
import { CardStackComponent } from "./stack/CardStack";

export const GameBoardComponent = () => {
    const dispatch = useAppDispatch();
    const gameInit = useAppSelector(selectBoardInitialized);
    useEffect(() => {
        if (!gameInit) {
            dispatch(initNewGame());
        }

    }, [gameInit, dispatch]);

    if (!gameInit) {
        return (<div> Click on "Init new game"</div>)
    }

    return (
        <div>
            <div className="top">
                <CardBufferComponent />
                <CardStackComponent />
            </div>
            <div className="center">
                <BoardComponent />
            </div>
        </div>

    );
};

