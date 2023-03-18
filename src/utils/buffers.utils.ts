import { Card, CardsBuffers } from "../models/cards";
import { compareCards } from "./card.utils";

export const isCardInBuffers = (buffers: CardsBuffers, card: Card | undefined): boolean =>
    getBufferIndexForCard(buffers, card) !== -1;

export const getBufferIndexForCard = (buffers: CardsBuffers, card: Card | undefined): number =>
    Object.values(buffers).findIndex((bufferCard) => compareCards(bufferCard, card));

export const removeCardFromBuffers = (buffers: CardsBuffers, card: Card | undefined): void => {
    if (isCardInBuffers(buffers, card)) {
        //buffers[getBufferIndexForCard(buffers,,card)] = undefined;
    }

}
