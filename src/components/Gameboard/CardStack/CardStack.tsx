import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectStacks, stackSelected } from "../../../features/gameboard/GameboardSlice";
import { Card, CardsStacksKeys } from "../../../models/cards.d";
import { STACK_KEYS } from "../../../utils/stacks.utils";
import { CardPlaceholderComponent } from "../../CardPlaceholder/CardPlaceholder";
import styles from './CardStack.module.css';

export const CardStackComponent = () => {
    const dispatch = useAppDispatch();
    const cardStack = useAppSelector(selectStacks);

    const onStackClicked = (stackId: CardsStacksKeys, card: Card | undefined) => {
        dispatch(stackSelected({ stackId, card }));
    };

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
