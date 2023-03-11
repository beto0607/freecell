import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initNewGame, selectBoardInitialized } from "../../features/gameboard/GameboardSlice";
import { BoardComponent } from "./Board/Board";
import { CardBufferComponent } from "./CardBuffer/CardBuffer";
import { CardStackComponent } from "./CardStack/CardStack";

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

