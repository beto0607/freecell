import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { bufferSelected, selectBuffers, selectSelectedCard } from "../../../features/gameboard/GameboardSlice";
import { CardsBuffers } from "../../../models/cards.d";
import { CardPlaceholderComponent } from "../../CardPlaceholder/CardPlaceholder";
import styles from './CardBuffer.module.css';

// Real name of this area: "Free celle"
export const CardBufferComponent = () => {
    const dispatch = useAppDispatch();
    const cardBuffer = useAppSelector(selectBuffers);
    const selectedCard = useAppSelector(selectSelectedCard);
    const onBufferClicked = (bufferId: keyof CardsBuffers) => {
        dispatch(bufferSelected({ bufferId, card: selectedCard }));
    };

    return (
        <div className={styles.wrapper}>
            <CardPlaceholderComponent card={cardBuffer[0]} onClick={() => onBufferClicked(0)} />
            <CardPlaceholderComponent card={cardBuffer[1]} onClick={() => onBufferClicked(1)} />
            <CardPlaceholderComponent card={cardBuffer[2]} onClick={() => onBufferClicked(2)} />
            <CardPlaceholderComponent card={cardBuffer[3]} onClick={() => onBufferClicked(3)} />
        </div>
    );
};
