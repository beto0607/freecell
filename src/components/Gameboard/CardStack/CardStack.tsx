import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { gameEnded, selectStacks, stackSelected } from "../../../features/gameboard/GameboardSlice";
import { Card, CardsStacksKeys } from "../../../models/cards.d";
import { isGameFinished, STACK_KEYS } from "../../../utils/stacks.utils";
import { CardPlaceholderComponent } from "../../CardPlaceholder/CardPlaceholder";
import styles from './CardStack.module.css';

// Real name of this area: "Foundation"
export const CardStackComponent = () => {
    const dispatch = useAppDispatch();
    const cardStack = useAppSelector(selectStacks);

    const onStackClicked = (stackId: CardsStacksKeys, card: Card | undefined) => {
        dispatch(stackSelected({ stackId, card }));
    };

    useEffect(() => {
        console.log(cardStack);
        
        if (!isGameFinished(cardStack)) {
            return;
        }
        dispatch(gameEnded());
    }, [dispatch, cardStack]);

    const stacks = STACK_KEYS;

    return (
        <div className={styles.wrapper}>
            {stacks
                .map((suit) => {
                    const card = cardStack[suit].at(-1);
                    return (<CardPlaceholderComponent key={suit} card={card} suit={suit} onClick={() => onStackClicked(suit, card)} />);
                })}
        </div>
    );
}
