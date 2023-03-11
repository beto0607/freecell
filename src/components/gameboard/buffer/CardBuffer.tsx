import { useAppSelector } from "../../../app/hooks";
import { selectBuffer } from "../../../features/gameboard/GameboardSlice";

export const CardBufferComponent = () => {

    const cardBuffer = useAppSelector(selectBuffer);

    console.log('CardBuffer', cardBuffer);
    return (
        <div>
            Card Buffer
        </div>
    );
};
