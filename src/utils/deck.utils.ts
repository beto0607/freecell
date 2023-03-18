import { Card, CardSuit, DealtCards, Deck } from "../models/cards";
import { shuffleArray } from "./array.utils";

export const CARD_SUITS = [CardSuit.Spade, CardSuit.Diamond, CardSuit.Club, CardSuit.Heart];
export const CARD_NUMBERS: Card['number'][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
export const COLUMN_COUNT = 8;

export const initDeck = (): Card[] => {
    const deck: Card[] = []; 
    for (let index = 0; index < 52; index++) {
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

