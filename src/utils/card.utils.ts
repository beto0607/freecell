import { Card, CardColor, CardSuit, CardValue } from "../models/cards";

export const CARD_VALUES: CardValue[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
export const CLUB_ICON = "♣";
export const SPADE_ICON = "♠";
export const DIAMOD_ICON = "♦";
export const HEART_ICON = "♥";

export const getIconFor = (card: Card | undefined): string => {
    switch (card?.suit) {
        case CardSuit.Club:
            return CLUB_ICON;
        case CardSuit.Spade:
            return SPADE_ICON;
        case CardSuit.Heart:
            return HEART_ICON;
        case CardSuit.Diamond:
            return DIAMOD_ICON;
        default:
            return "";
    }
}

export const getCardColorForSuit = (cardSuit: CardSuit | undefined): CardColor => {
    switch (cardSuit) {
        case CardSuit.Club:
        case CardSuit.Spade:
            return CardColor.Black;
        case CardSuit.Heart:
        case CardSuit.Diamond:
            return CardColor.Red;
        default:
            return CardColor.Invalid;
    }
}

export const getCardColorFor = (card: Card | undefined): CardColor => {
    return getCardColorForSuit(card?.suit);
}

export const getCardValue = (card: Card | undefined): CardValue | undefined => {
    return CARD_VALUES[(card?.number ?? 0) - 1];
}

export const cardToString = (card: Card | undefined): string => {
    return `${getCardValue(card) ?? ''}${getIconFor(card)}`;
}

export const compareCards = <C extends Card | undefined>(aCard: C, anotherCard: C): boolean => {
    return !!aCard &&
        !!anotherCard &&
        aCard?.suit === anotherCard?.suit &&
        aCard?.number === anotherCard?.number;
}

