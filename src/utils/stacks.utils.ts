import { Card, CardsStacks, CardsStacksKeys, CardSuit, DealtCards } from "../models/cards.d";
import { compareCards } from "./card.utils";

export const STACK_KEYS: CardsStacksKeys[] = [
    CardSuit.Heart,
    CardSuit.Spade,
    CardSuit.Diamond,
    CardSuit.Club,
];

export const initStacks = (): CardsStacks => ({
    [CardSuit.Heart]: [],
    [CardSuit.Club]: [],
    [CardSuit.Spade]: [],
    [CardSuit.Diamond]: [],
});

export const isCardInStack = (stack: CardsStacks[keyof CardsStacks], card: Card | undefined): boolean =>
    !!card && stack.some((stackCard) => compareCards(stackCard, card));

export const isCardInStacks = (stacks: CardsStacks, card: Card | undefined): boolean => {
    return isCardInStack(stacks.Diamond, card) ||
        isCardInStack(stacks.Spade, card) ||
        isCardInStack(stacks.Club, card) ||
        isCardInStack(stacks.Heart, card);
};

export const removeCardFromStacks = (stacks: CardsStacks, card: Card | undefined): void => {
    for (const key of STACK_KEYS) {
        const stack = stacks[key];
        if (stack.length && compareCards(stack.at(-1), card)) {
            stack.pop();
        }
    }
};

export const isCardMovableToStack = (stacks: CardsStacks, stackId: CardsStacksKeys, card: Card | undefined): boolean => {
    if (!card) {
        return false;
    }
    if (stackId !== card.suit) {
        return false;
    }
    const stack = stacks[stackId];
    if ((stack.at(-1)?.number ?? 0) !== card.number - 1) {
        return false;
    }
    return true;
}

export const moveCardToColumnFromStacks = (board: DealtCards, stacks: CardsStacks, card: Card | undefined, targetColmunIndex: number): void => {
    if (
        !board[targetColmunIndex] ||
        !card
    ) {
        return;
    }

    board[targetColmunIndex].push(card);
    removeCardFromStacks(stacks, card);
};

export const isGameFinished = (stacks: CardsStacks): boolean =>
    STACK_KEYS.reduce((acc, key): number => acc + stacks[key].length, 0) === 52;
