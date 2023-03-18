import { Card, CardsBuffers, CardsBuffersKeys, CardsStacks, CardsStacksKeys, CardSuit, DealtCards, Deck } from "../models/cards";
import { shuffleArray } from "./array.utils";
import { compareCards, isCardStackableWith } from "./card.utils";
import { getCardIndexInColumn, getColumnIndexForCard } from "./column.utils";


export const CARD_SUITS = [CardSuit.Spade, CardSuit.Diamond, CardSuit.Club, CardSuit.Heart];
export const CARD_NUMBERS: Card['number'][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
export const COLUMN_COUNT = 8;

export const initDeck = (): Card[] => {
    const deck: Card[] = []; for (let index = 0; index < 52; index++) {
        const number: Card['number'] = CARD_NUMBERS[index % 13];
        const suit = CARD_SUITS[Math.floor(index / 13)];
        deck.push({
            suit,
            number,
        });

    }
    return deck;
};

export const dealCards = (deck: Deck): DealtCards => {
    const shuffledDeck = shuffleArray(deck);
    const dealtCards: DealtCards = [];

    for (let i = 0; i < COLUMN_COUNT; i++) {
        dealtCards.push([]);
    }

    for (let index = 0; index < shuffledDeck.length; index++) {
        const card = shuffledDeck[index];
        dealtCards[index % dealtCards.length].push(card);
    }

    return dealtCards;
};

// TODO: Add tests
export const isCardMovableToBuffer = (board: DealtCards, stacks: CardsStacks, card: Card | undefined): boolean => {
    if (!card) {
        return false;
    }
    return (
        Object.values(stacks).some((stack) => compareCards(card, stack.at(-1))) ||
        board.some((column) => compareCards(card, column.at(-1)))
    );
};

export const isCardMovableToColumn = (board: DealtCards, buffers: CardsBuffers, card: Card | undefined, targetColmunIndex: number): boolean => {
    const targetColumn = board[targetColmunIndex];
    if (!card || !targetColumn) {
        return false;
    }
    const sourceColumnIndex = getColumnIndexForCard(board, card);
    const sourceColumn = board[sourceColumnIndex];
    if (!sourceColumn) {
        // Card selected from stack/buffers
        return targetColumn.length === 0 ||
            isCardStackableWith(card, targetColumn.at(-1));
    }
    const cardIndexInColumn = getCardIndexInColumn(sourceColumn, card)
    if (cardIndexInColumn + 1 === sourceColumn.length) {
        // Last card in column
        return targetColumn.length === 0 ||
            isCardStackableWith(card, targetColumn.at(-1));
    }
    // Multiple cards
    const stackOfCardsToMove = sourceColumn.slice(cardIndexInColumn);
    for (let i = 1; i < stackOfCardsToMove.length; i++) {
        if (!isCardStackableWith(stackOfCardsToMove[i], stackOfCardsToMove[i - 1])) {
            return false;
        }
    }
    return targetColumn.length === 0 ||
        isCardStackableWith(stackOfCardsToMove[0], targetColumn.at(-1));
};

// TODO: Add tests
export const isCardMovableToStack = (board: DealtCards, buffers: CardsBuffers, stacks: CardsStacks, stackId: CardsStacksKeys, card: Card | undefined): boolean => {
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
    return (
        Object.values(buffers).some((bufferCard) => compareCards(bufferCard, card)) ||
        board.some((column) => compareCards(card, column.at(-1)))
    );
}

// TODO: Add tests
// ! Attention, this produces a side effect
export const removeCard = (board: DealtCards, stacks: CardsStacks | undefined, buffers: CardsBuffers | undefined, card: Card): void => {
    if (stacks) {
        for (const stack of Object.values(stacks)) {
            if (!compareCards(stack.at(-1), card)) {
                continue;
            }
            stack.pop();
            return;
        }
    }
    if (buffers) {
        const keys: CardsBuffersKeys[] = [0, 1, 2, 3];
        for (const key of keys) {
            if (!compareCards(buffers[key], card)) {
                continue;
            }
            buffers[key] = undefined;
            return;
        }
    }
    for (const column of board) {
        if (!column.some((columnCard) => compareCards(columnCard, card))) {
            continue;
        }
        column.splice(column.length - 1, 1);
        return;
    }
};

export const moveCardToColumn = (board: DealtCards, buffers: CardsBuffers, stacks: CardsStacks, card: Card | undefined, targetColmunIndex: number): void => {
    if (!board[targetColmunIndex] ||
        !card) {
        return;
    }

    const sourceColumnIndex = board.findIndex((column) => !!column.find((colmunCard) => compareCards(colmunCard, card)));
    const sourceColumn = board[sourceColumnIndex];
    if (!sourceColumn) {
        return;
    }
    const cardIndexInColumn = sourceColumn.findIndex((colmunCard) => compareCards(colmunCard, card));
    board[sourceColumnIndex] = sourceColumn.slice(0, cardIndexInColumn);

    board[targetColmunIndex] = [
        ...board[targetColmunIndex],
        ...sourceColumn.slice(cardIndexInColumn, sourceColumn.length)
    ];
};

