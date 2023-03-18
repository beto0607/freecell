import { Card, CardsBuffers, CardsBuffersKeys } from "../models/cards.d";
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

export const isCardMovableToBuffer = (buffers: CardsBuffers, bufferId: CardsBuffersKeys, card: Card | undefined): boolean => {
    if (!card) {
        return false;
    }
    return !buffers[bufferId];
};

export const getFreeBuffer = (buffers: CardsBuffers): CardsBuffersKeys | undefined =>
    BUFFER_KEYS.find((key) => !buffers[key])

