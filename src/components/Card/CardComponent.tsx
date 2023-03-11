import { useAppDispatch } from '../../app/hooks';
import { selectCard } from '../../features/gameboard/GameboardSlice';
import { Card, CardColor } from '../../models/cards';
import { getCardColorFor, getCardValue, getIconFor } from '../../utils/card.utils';
import { classes } from '../../utils/style.utils';
import styles from './CardComponent.module.css';

interface CardComponentProps {
    card: Card;
    selected?: boolean;
    onClick?: (card: Card) => void;
}

export const CardComponent = ({ card, selected, onClick }: CardComponentProps) => {
    const dispatch = useAppDispatch();
    const cardColor = getCardColorFor(card);
    const colorClass = cardColor === CardColor.Black ? styles.black : styles.red;

    const selectedClass = selected ? styles.selected : '';

    const classNames = classes(styles.wrapper, colorClass, selectedClass);


    const onCardClicked = () => {
        dispatch(selectCard(card));
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

