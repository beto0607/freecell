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
