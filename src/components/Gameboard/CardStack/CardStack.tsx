import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectStacks, stackClicked } from "../../../features/gameboard/GameboardSlice";
import { Card, CardsStacksKeys, CardSuit } from "../../../models/cards";
import { STACK_KEYS } from "../../../utils/stacks.utils";
import { CardPlaceholderComponent } from "../../CardPlaceholder/CardPlaceholder";
import styles from './CardStack.module.css';

export const CardStackComponent = () => {

    const dispatch = useAppDispatch();
    const cardStack = useAppSelector(selectStacks);
    const onStackClicked = (stackId: CardsStacksKeys, card: Card | undefined) => {
        dispatch(stackClicked({ stackId, card }));
    };

    const stacks = STACK_KEYS;

    return (
        <div className={styles.wrapper}>
            {
                stacks
                    .map((suit) => {
                        const card = cardStack[suit].at(-1);
                        return (<CardPlaceholderComponent key={suit} card={card} suit={suit} onClick={() => onStackClicked(suit, card)} />);
                    })
            }
        </div>
    );
}
