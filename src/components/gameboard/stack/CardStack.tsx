import { useAppSelector } from "../../../app/hooks";
import { selectStack } from "../../../features/gameboard/GameboardSlice";

export const CardStackComponent = () => {

    const cardStack = useAppSelector(selectStack);
    console.log('CardStack', cardStack);


    return (
        <div>
            Card stack
        </div>
    );
}
