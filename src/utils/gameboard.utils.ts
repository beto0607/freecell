import { Card, DealtCards } from "../models/cards.d";
import { compareCards, isCardStackableWith } from "./card.utils";
import { getCardIndexInColumn, getColumnIndexForCard, isLastCardForColumn } from "./column.utils";


export const moveCardToColumn = (board: DealtCards, card: Card | undefined, targetColmunIndex: number): void => {
    if (!board[targetColmunIndex] ||
        !card) {
        return;
    }

    const sourceColumnIndex = board.findIndex((column) => !!column.find((colmunCard) => compareCards(colmunCard, card)));
    const sourceColumn = board[sourceColumnIndex];
    if (!sourceColumn) {
        // Card selected from stack/buffers
        board[targetColmunIndex].push(card);
        return;
    }
    const cardIndexInColumn = sourceColumn.findIndex((colmunCard) => compareCards(colmunCard, card));
    board[sourceColumnIndex] = sourceColumn.slice(0, cardIndexInColumn);

    board[targetColmunIndex] = [
        ...board[targetColmunIndex],
        ...sourceColumn.slice(cardIndexInColumn, sourceColumn.length)
    ];
};

export const isCardMovableToColumn = (board: DealtCards, freeBuffersNumber: number, card: Card | undefined, targetColmunIndex: number): boolean => {
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
    const freeColumnsNumber = getFreeColumnsNumber(board, targetColmunIndex) || 1;
    // Multiple cards
    const stackOfCardsToMove = sourceColumn.slice(cardIndexInColumn);
    if (stackOfCardsToMove.length > (freeBuffersNumber + 1) * freeColumnsNumber) {
        return false;
    }
    for (let i = 1; i < stackOfCardsToMove.length; i++) {
        if (!isCardStackableWith(stackOfCardsToMove[i], stackOfCardsToMove[i - 1])) {
            return false;
        }
    }
    return targetColumn.length === 0 ||
        isCardStackableWith(stackOfCardsToMove[0], targetColumn.at(-1));
};

export const removeCardFromBoard = (board: DealtCards, card: Card | undefined): void => {
    if (!card) {
        return;
    }
    for (const column of board) {
        if (!column.some((columnCard) => compareCards(columnCard, card))) {
            continue;
        }
        column.splice(column.length - 1, 1);
        return;
    }
};

export const isSingleCardSelection = (board: DealtCards, card: Card | undefined): boolean => {
    if (!card) {
        return false;
    }
    return board.some((column) => isLastCardForColumn(column, card));
};

export const getFreeColumnsNumber = (board: DealtCards, omitColumn: number): number =>
    board.reduce((acc, column, index, _arr): number =>
        omitColumn === index || !!column.length ?
            acc :
            (acc + 1),
        0);

