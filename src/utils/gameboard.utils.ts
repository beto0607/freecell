import { Card, CardsBuffers, CardsStacks, DealtCards } from "../models/cards";
import { BUFFER_KEYS } from "./buffers.utils";
import { compareCards, isCardStackableWith } from "./card.utils";
import { getCardIndexInColumn, getColumnIndexForCard } from "./column.utils";

export const isCardMovableToColumn = (board: DealtCards, card: Card | undefined, targetColmunIndex: number): boolean => {
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
        for (const key of BUFFER_KEYS) {
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

export const moveCardToColumn = (board: DealtCards, card: Card | undefined, targetColmunIndex: number): void => {
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

