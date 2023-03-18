import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deselectCard, selectCard, selectSelectedCard } from '../../features/gameboard/GameboardSlice';
import { Card, CardColor } from '../../models/cards.d';
import cardStyles from '../../styles/card.module.css';
import { compareCards, getCardColorFor, getCardValue, getIconFor } from '../../utils/card.utils';
import { classes } from '../../utils/style.utils';
import styles from './Card.module.css';

interface CardComponentProps {
    card: Card;
    onClick?: (card: Card) => void;
}

export const CardComponent = ({ card, onClick }: CardComponentProps) => {
    const dispatch = useAppDispatch();
    const selectedCard = useAppSelector(selectSelectedCard);
    const cardColor = getCardColorFor(card);
    const colorClass = cardColor === CardColor.Black ? cardStyles.black : cardStyles.red;

    const selectedClass = compareCards(selectedCard, card) ? styles.selected : '';

    const classNames = classes(styles.wrapper, colorClass, selectedClass);


    const onCardClicked = () => {
        if (compareCards(card, selectedCard)) {
            dispatch(deselectCard());
            return;
        }
        if (!selectedCard) {
            dispatch(selectCard(card));
            return;
        }
        onClick?.(card);
    };

    return (
        <div className={classNames} onClick={onCardClicked}>
            <CardNameComponent card={card} isBottom={false} />
            <div className={styles.figure}>
            </div>
            <CardNameComponent card={card} isBottom={true} />
        </div>
    );
};

interface CardNameComponentProps {
    card: Card;
    isBottom: boolean;
}

const CardNameComponent = ({ card, isBottom }: CardNameComponentProps) => {
    const value = getCardValue(card);
    const icon = getIconFor(card);
    const classNames = classes(
        styles['card-name'],
        isBottom ? styles['bottom-card-name'] : ''
    );
    return (
        <div className={classNames}>
            <span>{value}</span>
            <span>{icon}</span>
        </div>
    );
}

