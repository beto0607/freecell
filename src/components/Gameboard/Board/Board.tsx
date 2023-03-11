import { useAppSelector } from "../../../app/hooks";
import { selectBoard, selectSelectedCard } from "../../../features/gameboard/GameboardSlice";
import { Card } from "../../../models/cards";
import { cardToString, compareCards } from "../../../utils/card.utils";
import { classes } from "../../../utils/style.utils";
import { CardComponent } from "../../Card/Card";
import styles from './Board.module.css';

export const BoardComponent = () => {
    const cardsBoard = useAppSelector(selectBoard);
    const selectedCard = useAppSelector(selectSelectedCard);

    return (
        <div className={styles.board}>
            <span className={styles.header}> Cards:</span>

            {cardsBoard
                .map((column, index) => (<BoardColumnComponent cards={column} index={index} key={`column#${index}`} selectedCard={selectedCard} />))}
        </div>
    );
};

interface CardsColumnComponentProps {
    cards: Card[];
    index: number;
    selectedCard?: Card;
}

const BoardColumnComponent = ({ cards, index, selectedCard }: CardsColumnComponentProps) => {
    return (
        <div className={styles.column}>
            Column # {index}
            {cards
                .map((card) => {
                    const selected = compareCards(card, selectedCard);
                    const classNames = classes(styles['column-item'], selected ? styles['selected'] : '');
                    return (
                        <div className={classNames} key={cardToString(card)}>
                            <CardComponent card={card} selected={selected} />
                        </div>);
                })}
        </div>
    );
}

