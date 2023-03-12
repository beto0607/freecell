import { Card, CardColor, CardSuit } from "../../models/cards";
import { getCardColorForSuit, getIconForSuit } from "../../utils/card.utils";
import { CardComponent } from "../Card/Card";
import styles from './CardPlaceholder.module.css';
import cardStyles from '../../styles/card.module.css';
import { classes } from "../../utils/style.utils";

export type CardPlaceholderClickHandlerData = Pick<CardPlaceholderComponentProps, 'suit' | 'card'>;

interface CardPlaceholderComponentProps {
    card?: Card;
    suit?: CardSuit;
    onClick?: (data: CardPlaceholderClickHandlerData) => void;
}

export const CardPlaceholderComponent = ({ card, suit, onClick }: CardPlaceholderComponentProps) => {
    const onCardPlaceholderClicked = () => {
        onClick?.({ card, suit });
    }

    const icon = getIconForSuit(suit);
    const styleColor = getCardColorForSuit(suit) === CardColor.Red ? cardStyles.red : cardStyles.black;
    return (
        <div className={styles.wrapper} onClick={onCardPlaceholderClicked}>
            {card ?
                (<CardComponent card={card} onClick={onCardPlaceholderClicked} />) :

                (icon &&
                    <span className={classes(styleColor, styles['stack-span'])}>
                        {icon}
                    </span>)
            }
        </div>
    );

}
