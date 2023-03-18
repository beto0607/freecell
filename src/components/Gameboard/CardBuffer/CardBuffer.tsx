import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { bufferClicked, selectBuffers, selectSelectedCard } from "../../../features/gameboard/GameboardSlice";
import { CardsBuffers } from "../../../models/cards";
import { CardPlaceholderClickHandlerData, CardPlaceholderComponent } from "../../CardPlaceholder/CardPlaceholder";
import styles from './CardBuffer.module.css';

export const CardBufferComponent = () => {
    const dispatch = useAppDispatch();
    const cardBuffer = useAppSelector(selectBuffers);
    const selectedCard = useAppSelector(selectSelectedCard);
    const onBufferClicked = (bufferId: keyof CardsBuffers, data: CardPlaceholderClickHandlerData) => {
        dispatch(bufferClicked({ bufferId, card: selectedCard }));
    };

    return (
        <div className={styles.wrapper}>
            <CardPlaceholderComponent card={cardBuffer[0]} onClick={(_) => onBufferClicked(0, _)} />
            <CardPlaceholderComponent card={cardBuffer[1]} onClick={(_) => onBufferClicked(1, _)} />
            <CardPlaceholderComponent card={cardBuffer[2]} onClick={(_) => onBufferClicked(2, _)} />
            <CardPlaceholderComponent card={cardBuffer[3]} onClick={(_) => onBufferClicked(3, _)} />
        </div>
    );
};
