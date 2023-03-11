import { useAppSelector } from "../../../app/hooks";
import { selectBoard } from "../../../features/gameboard/GameboardSlice";
import { Card } from "../../../models/cards";
import { cardToString } from "../../../utils/card.utils";
import { CardComponent } from "../../card/CardComponent";
import styles from './BoardComponent.module.css';

export const BoardComponent = () => {
    const cardsBoard = useAppSelector(selectBoard);

    console.log('Cards board', cardsBoard);

    return (
        <div className={styles.board}>
            <span className={styles.header}> Cards:</span>

            {cardsBoard
                .map((column, index) => (<BoardColumnComponent cards={column} index={index} key={`column#${index}`} />))}
        </div>
    );
};

interface CardsColumnComponentProps {
    cards: Card[];
    index: number;
}

const BoardColumnComponent = ({ cards, index }: CardsColumnComponentProps) => {
    return (
        <div className={styles.column}>
            Column # {index}
            {cards
                .map((card) => (<CardComponent card={card} key={cardToString(card)} />))}
        </div>
    );
}
