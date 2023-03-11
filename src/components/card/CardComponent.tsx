import { Card } from '../../models/cards';
import { cardToString, getCardColorFor } from '../../utils/card.utils';


interface CardComponentProps {
    card: Card;
}

export const CardComponent = ({ card }: CardComponentProps) => {
    const cardColor = getCardColorFor(card);
    const cardString = cardToString(card);

    return (
        <div>
            {`${cardString} ${cardColor}`}
        </div>
    );

};


