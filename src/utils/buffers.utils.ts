import { Card, CardsBuffers, CardsBuffersKeys, CardsStacks, DealtCards } from "../models/cards";
import { compareCards } from "./card.utils";

export const BUFFER_KEYS: CardsBuffersKeys[] = [0, 1, 2, 3];

export const isCardInBuffers = (buffers: CardsBuffers, card: Card | undefined): boolean =>
    getBufferIndexForCard(buffers, card) !== -1;

export const getBufferIndexForCard = (buffers: CardsBuffers, card: Card | undefined): number =>
    Object.values(buffers).findIndex((bufferCard) => compareCards(bufferCard, card));

export const removeCardFromBuffers = (buffers: CardsBuffers, card: Card | undefined): void => {
    for (const k of BUFFER_KEYS) {
        if (compareCards(buffers[k], card)) {
            buffers[k] = undefined;
        }
    }
};

export const isCardMovableToBuffer = (board: DealtCards, stacks: CardsStacks, card: Card | undefined): boolean => {
    if (!card) {
        return false;
    }
    return (
        Object.values(stacks).some((stack) => compareCards(card, stack.at(-1))) ||
        board.some((column) => compareCards(card, column.at(-1)))
    );
};

export const moveCardToColumnFromBuffers = (board: DealtCards, buffers: CardsBuffers, card: Card | undefined, targetColmunIndex: number): void => {
    if (
        !board[targetColmunIndex] ||
        !card
    ) {
        return;
    }
    board[targetColmunIndex].push(card);
    removeCardFromBuffers(buffers, card);
}

