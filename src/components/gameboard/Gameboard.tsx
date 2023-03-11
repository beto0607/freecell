import { useAppSelector } from "../../app/hooks";
import { selectBoardInitialized } from "../../features/gameboard/GameboardSlice";
import { BoardComponent } from "./board/BoardComponent";
import { CardBufferComponent } from "./buffer/CardBuffer";
import { CardStackComponent } from "./stack/CardStack";

export const GameBoardComponent = () => {

    const gameInit = useAppSelector(selectBoardInitialized);

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

