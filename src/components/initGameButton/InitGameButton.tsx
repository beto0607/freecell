import { useAppDispatch } from "../../app/hooks";
import { initNewGame } from "../../features/gameboard/GameboardSlice";

export const InitGameButton = () => {
    const dispatch = useAppDispatch();

    const onButtonClicked = () => {
        dispatch(initNewGame());
    };

    return (<button onClick={onButtonClicked}>Init game</button>);
};
