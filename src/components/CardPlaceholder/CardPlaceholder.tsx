import { Card, CardSuit } from "../../models/cards";
import { getIconForSuit } from "../../utils/card.utils";
import { CardComponent } from "../Card/Card";
import styles from './CardPlaceholder.module.css';

interface CardPlaceholderComponentProps {
    card?: Card;
    suit?: CardSuit
}

export const CardPlaceholderComponent = ({ card, suit }: CardPlaceholderComponentProps) => {

    if (card) {
        return (<CardComponent card={card} />);
    }

    const icon = getIconForSuit(suit);
    return (
        <div className={styles.wrapper}>
            {icon &&
                <span>
                    {icon}
                </span>}
        </div>
    );

}
