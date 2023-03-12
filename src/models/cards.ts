export enum CardSuit {
    Spade = "Spade",
    Diamond = "Diamond",
    Club = "Club",
    Heart = "Heart",
    Invalid = "Invalid",
}

export enum CardColor {
    Black = "Black",
    Red = "Red",
    Invalid = "Invalid",
}

export type CardValue = 'A' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K';

export interface Card {
    suit: CardSuit;
    number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
}

export type Deck = Array<Card>;

export type DealtCards = Array<Array<Card>>; // 6 columns of 8/9 cards each

export type CardsBuffers = {
    0: Card | undefined,
    1: Card | undefined,
    2: Card | undefined,
    3: Card | undefined,
};
export type CardsBuffersKeys = keyof CardsBuffers;

export type CardsStacks = {
    [CardSuit.Club]: Array<Card>;
    [CardSuit.Spade]: Array<Card>;
    [CardSuit.Heart]: Array<Card>;
    [CardSuit.Diamond]: Array<Card>;
};
export type CardsStacksKeys = keyof CardsStacks;
