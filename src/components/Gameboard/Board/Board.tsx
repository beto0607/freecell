import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { moveCard, selectBoard, selectCard, selectSelectedCard } from "../../../features/gameboard/GameboardSlice";
import { Card } from "../../../models/cards";
import { cardToString, compareCards } from "../../../utils/card.utils";
import { classes } from "../../../utils/style.utils";
import { CardComponent } from "../../Card/Card";
import styles from './Board.module.css';

// Real name of this area: "tableau"
export const BoardComponent = () => {
    const cardsBoard = useAppSelector(selectBoard);
    const selectedCard = useAppSelector(selectSelectedCard);

    return (
        <div className={styles.board}>
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

const BoardColumnComponent = ({ cards, selectedCard }: CardsColumnComponentProps) => {
    const dispatch = useAppDispatch();
    const onCardClicked = (card: Card) => {
        dispatch(selectCard({ card }));
    };
    const onCardDoubleClicked = (card: Card) => {
        dispatch(moveCard({ card }));
    };
    return (
        <div className={styles.column}>
            {cards
                .map((card) => {
                    const selected = compareCards(card, selectedCard);
                    const classNames = classes(styles['column-item'], selected ? styles['selected'] : '');
                    return (
                        <div className={classNames} key={cardToString(card)}>
                            <CardComponent card={card} onClick={onCardClicked} onDoubleClick={onCardDoubleClicked} />
                        </div>);
                })}
        </div>
    );
}

