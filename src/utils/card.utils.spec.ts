import { Card, CardColor, CardSuit } from '../models/cards.d';
import { cardToString, CLUB_ICON, compareCards, DIAMOD_ICON, getCardColorFor, getCardColorForSuit, getCardValue, getIconFor, getIconForSuit, HEART_ICON, isCardStackableWith, SPADE_ICON } from './card.utils';


const mockCard: Card = {
    number: 1,
    suit: CardSuit.Invalid,
};

describe('card utils', () => {
    describe('isCardStackableWith', () => {
        const targetCard: Card = {
            number: 2,
            suit: CardSuit.Heart
        };

        const sourceCard: Card = {
            number: 1,
            suit: CardSuit.Spade,
        };

        it('should return false - undefined', () => {
            expect(isCardStackableWith(undefined, undefined)).toBe(false);
            expect(isCardStackableWith(mockCard, undefined)).toBe(false);
            expect(isCardStackableWith(undefined, mockCard)).toBe(false);
        });

        it('should return false - same card', () => {
            expect(isCardStackableWith(mockCard, mockCard)).toBe(false);
        });

        it('should return false - same color', () => {
            expect(isCardStackableWith(sourceCard, { ...targetCard, suit: sourceCard.suit })).toBe(false);
        });

        it('should return false - invalid color', () => {
            expect(isCardStackableWith(mockCard, targetCard)).toBe(false);
            expect(isCardStackableWith(sourceCard, mockCard)).toBe(false);
        });

        it('should return false - invalid number', () => {
            expect(isCardStackableWith(sourceCard, { ...targetCard, number: 13 })).toBe(false);
            expect(isCardStackableWith(sourceCard, { ...targetCard, number: sourceCard.number })).toBe(false);
            expect(isCardStackableWith({ ...sourceCard, number: 5 }, { ...targetCard, number: 4 })).toBe(false);
        });

        it('should return true', () => {
            expect(isCardStackableWith(sourceCard, targetCard)).toBe(true);
            expect(isCardStackableWith({ ...sourceCard, number: 12 }, { ...targetCard, number: 13 })).toBe(true);
        });
    });
    describe('getCardValue', () => {
        it('should return undefined when undefined card', () => {
            const cardValue = getCardValue(undefined);
            expect(cardValue).toBeUndefined();
        });
        it('should return undefined when invalid number', () => {
            const cardValue = getCardValue({
                ...mockCard,
                number: -1 as unknown as Card['number']
            });
            expect(cardValue).toBeUndefined();
        });
        it('should return undefined when invalid number - >13', () => {
            const cardValue = getCardValue({
                ...mockCard,
                number: 14 as unknown as Card['number']
            });
            expect(cardValue).toBeUndefined();
        });
        it('should return correct value - figures', () => {
            const card: Card = { ...mockCard };
            card.number = 1;
            expect(getCardValue(card)).toBe('A');
            card.number = 11;
            expect(getCardValue(card)).toBe('J');
            card.number = 12;
            expect(getCardValue(card)).toBe('Q');
            card.number = 13;
            expect(getCardValue(card)).toBe('K');
        });
        it('should return correct value - numbers', () => {
            for (let index = 2; index <= 10; index++) {
                const card: Card = {
                    ...mockCard,
                    number: index as Card['number']
                };
                expect(getCardValue(card)).toBe(index);
            }
        });

    });
    describe('cardToString', () => {
        it('should return an empty string when undefined', () => {
            const cardString = cardToString(undefined);
            expect(cardString).toBe("");
        });
        it('should return a valid string - figures - A', () => {
            const card: Card = {
                number: 1,
                suit: CardSuit.Spade
            };
            const cardString = cardToString(card);
            expect(cardString).toBe(`A${SPADE_ICON}`);
        });
        it('should return a valid string - figures - J', () => {
            const card: Card = {
                number: 11,
                suit: CardSuit.Club
            };
            const cardString = cardToString(card);
            expect(cardString).toBe(`J${CLUB_ICON}`);
        });
        it('should return a valid string - figures - Q', () => {
            const card: Card = {
                number: 12,
                suit: CardSuit.Diamond
            };
            const cardString = cardToString(card);
            expect(cardString).toBe(`Q${DIAMOD_ICON}`);
        });
        it('should return a valid string - figures - K', () => {
            const card: Card = {
                number: 13,
                suit: CardSuit.Invalid
            };
            const cardString = cardToString(card);
            expect(cardString).toBe(`K`);
        });
        it('should return a valid string - numbers', () => {
            for (let index = 2; index <= 10; index++) {
                const card: Card = {
                    number: index as Card['number'],
                    suit: CardSuit.Heart
                };
                const cardString = cardToString(card);
                expect(cardString).toBe(`${index}${HEART_ICON}`);

            }
        });
    });

    describe('getCardColorFor', () => {
        it('should return invalid color when undefined', () => {
            const color = getCardColorFor(undefined);
            expect(color).toBe(CardColor.Invalid);
        });
        it('should return empty string when invalid suit', () => {
            const color = getCardColorFor(mockCard);
            expect(color).toBe(CardColor.Invalid);
        });
        it('should return empty string when empty object', () => {
            const color = getCardColorFor({
                ...mockCard,
                suit: "CardSuit.Invalid" as unknown as CardSuit
            });
            expect(color).toBe(CardColor.Invalid);
        });

        it('should return black for Spade', () => {
            const card = {
                ...mockCard,
                suit: CardSuit.Spade
            };
            const color = getCardColorFor(card);
            expect(color).toBe(CardColor.Black);
        });
        it('should return black for Club', () => {
            const card = {
                ...mockCard,
                suit: CardSuit.Club
            };
            const color = getCardColorFor(card);
            expect(color).toBe(CardColor.Black);
        });
        it('should return red for Heart', () => {
            const card = {
                ...mockCard,
                suit: CardSuit.Heart
            };
            const color = getCardColorFor(card);
            expect(color).toBe(CardColor.Red);
        });
        it('should return red for Diamond', () => {
            const card = {
                ...mockCard,
                suit: CardSuit.Diamond
            };
            const color = getCardColorFor(card);
            expect(color).toBe(CardColor.Red);
        });
    });

    describe('getCardColorForSuit', () => {
        it('should return invalid color when undefined', () => {
            const color = getCardColorForSuit(undefined);
            expect(color).toBe(CardColor.Invalid);
        });
        it('should return empty string when invalid suit', () => {
            const color = getCardColorForSuit(CardSuit.Invalid);
            expect(color).toBe(CardColor.Invalid);
        });
        it('should return empty string when empty object', () => {
            const color = getCardColorForSuit("CardSuit.Invalid" as unknown as CardSuit);
            expect(color).toBe(CardColor.Invalid);
        });

        it('should return black for Spade', () => {
            const color = getCardColorForSuit(CardSuit.Spade);
            expect(color).toBe(CardColor.Black);
        });
        it('should return black for Club', () => {
            const color = getCardColorForSuit(CardSuit.Club);
            expect(color).toBe(CardColor.Black);
        });
        it('should return red for Heart', () => {
            const color = getCardColorForSuit(CardSuit.Heart);
            expect(color).toBe(CardColor.Red);
        });
        it('should return red for Diamond', () => {
            const color = getCardColorForSuit(CardSuit.Diamond);
            expect(color).toBe(CardColor.Red);
        });
    });

    describe('getIconFor', () => {
        it('should return empty string when undefined', () => {
            const icon = getIconFor(undefined);
            expect(icon).toBe("");
        });
        it('should return empty string when invalid suit', () => {
            const icon = getIconFor({
                ...mockCard,
                suit: CardSuit.Invalid
            });
            expect(icon).toBe("");
        });
        it('should return empty string when empty object', () => {
            const icon = getIconFor({} as Card);
            expect(icon).toBe("");
        });

        it('should return Spade icon', () => {
            const icon = getIconFor({
                ...mockCard,
                suit: CardSuit.Spade
            });
            expect(icon).toBe(SPADE_ICON);
        });
        it('should return Club icon', () => {
            const icon = getIconFor({
                ...mockCard,
                suit: CardSuit.Club
            });
            expect(icon).toBe(CLUB_ICON);
        });
        it('should return Heart icon', () => {
            const icon = getIconFor({
                ...mockCard,
                suit: CardSuit.Heart
            });
            expect(icon).toBe(HEART_ICON);
        });
        it('should return Diamond icon', () => {
            const icon = getIconFor({
                ...mockCard,
                suit: CardSuit.Diamond
            });
            expect(icon).toBe(DIAMOD_ICON);
        });
    });

    describe('getIconForSuit', () => {
        it('should return empty string when undefined', () => {
            const icon = getIconForSuit(undefined);
            expect(icon).toBe("");
        });
        it('should return empty string when invalid suit', () => {
            const icon = getIconForSuit(CardSuit.Invalid);
            expect(icon).toBe("");
        });
        it('should return empty string when empty object', () => {
            const icon = getIconForSuit("" as CardSuit);
            expect(icon).toBe("");
        });

        it('should return Spade icon', () => {
            const icon = getIconForSuit(CardSuit.Spade);
            expect(icon).toBe(SPADE_ICON);
        });
        it('should return Club icon', () => {
            const icon = getIconForSuit(CardSuit.Club);
            expect(icon).toBe(CLUB_ICON);
        });
        it('should return Heart icon', () => {
            const icon = getIconForSuit(CardSuit.Heart);
            expect(icon).toBe(HEART_ICON);
        });
        it('should return Diamond icon', () => {
            const icon = getIconForSuit(CardSuit.Diamond);
            expect(icon).toBe(DIAMOD_ICON);
        });
    });

    describe('compareCards', () => {
        it('should return false when some is undefined', () => {
            const comparison = compareCards(undefined, undefined);
            expect(comparison).toBeFalsy();
            const comparison2 = compareCards(mockCard, undefined);
            expect(comparison2).toBeFalsy();
            const comparison3 = compareCards(undefined, mockCard);
            expect(comparison3).toBeFalsy();
        });
        it('should return false when diffrent cards', () => {
            const aCard: Card = {
                number: 1,
                suit: CardSuit.Heart
            };
            const anotherCard: Card = {
                number: 10,
                suit: CardSuit.Spade
            };
            const comparison = compareCards(aCard, anotherCard);
            expect(comparison).toBeFalsy();
        });
        it('should return false when diffrent cards - same suit', () => {
            const aCard: Card = {
                number: 1,
                suit: CardSuit.Heart
            };
            const anotherCard: Card = {
                number: 10,
                suit: CardSuit.Heart
            };
            const comparison = compareCards(aCard, anotherCard);
            expect(comparison).toBeFalsy();
        });
        it('should return false when diffrent cards - same number', () => {
            const aCard: Card = {
                number: 1,
                suit: CardSuit.Spade
            };
            const anotherCard: Card = {
                number: 1,
                suit: CardSuit.Heart
            };
            const comparison = compareCards(aCard, anotherCard);
            expect(comparison).toBeFalsy();
        });
        it('should return true when cards are equal', () => {
            const aCard: Card = {
                number: 1,
                suit: CardSuit.Spade
            };
            const anotherCard: Card = {
                number: 1,
                suit: CardSuit.Spade
            };
            const comparison = compareCards(aCard, anotherCard);
            expect(comparison).toBeTruthy();
        });
        it('should return true when cards are equal - same card object', () => {
            const comparison = compareCards(mockCard, mockCard);
            expect(comparison).toBeTruthy();
        });
    });
});

