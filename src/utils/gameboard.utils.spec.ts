import { Card, CardSuit, DealtCards } from '../models/cards';
import { columnContainsCard } from './column.utils';
import { isCardMovableToColumn, moveCardToColumn } from './gameboard.utils';
import { dealCards, initDeck } from './deck.utils';

describe('gameboard utils', () => {
    describe('moveCardToColmun', () => {
        let dealtCards: DealtCards;
        const targetColumnIndex = 3;

        beforeEach(() => {
            const initialDeck = initDeck();
            dealtCards = dealCards(initialDeck);
        });

        it('should move a card from a column to another', () => {
            const card = dealtCards[0].at(-1); // last card from first colmun
            moveCardToColumn(dealtCards, card, targetColumnIndex)
            expect(columnContainsCard(dealtCards[3], card)).toBeTruthy();
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
        });

        it('should move many cards', () => {
            const card = dealtCards[0][0];
            moveCardToColumn(dealtCards, card, targetColumnIndex)
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
            expect(dealtCards[0]).toHaveLength(0);
            expect(columnContainsCard(dealtCards[3], card)).toBeTruthy();
            expect(dealtCards[3]).toHaveLength(14)
        });

        it('should not move undefined card', () => {
            const card = undefined; // last card from first colmun
            moveCardToColumn(dealtCards, card, targetColumnIndex)
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
            expect(columnContainsCard(dealtCards[3], card)).toBeFalsy();
        });

        it('should not move to an invalid targetIndex', () => {
            const card = dealtCards[0][0];
            moveCardToColumn(dealtCards, card, -1)
            expect(columnContainsCard(dealtCards[0], card)).toBeTruthy();
        });

        it('should not move card that aren\'t in the board', () => {
            const card = dealtCards[0].pop(); // pop removes the card from the board
            moveCardToColumn(dealtCards, card, 3);
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
            expect(columnContainsCard(dealtCards[3], card)).toBeFalsy();
        });
    });

    describe('isCardMovableToColumn', () => {
        let dealtCards: DealtCards;

        beforeEach(() => {
            const initialDeck = initDeck();
            dealtCards = dealCards(initialDeck);
        });

        describe('invalid cards', () => {
            it('should return false - undefined card', () => {
                expect(isCardMovableToColumn(dealtCards, undefined, 3)).toBe(false);
            });

            it('should return false - invalid target', () => {
                expect(isCardMovableToColumn(dealtCards, dealtCards[0][0], -1)).toBe(false);
            });
        });

        describe('single', () => {
            it('should return false - card not movable to target', () => {
                const card = dealtCards[0].at(-1);
                expect(isCardMovableToColumn(dealtCards, card, 3)).toBe(false);
            });

            it('should return false - invalid card from buffer/stacks', () => {
                const dealtCards: DealtCards = [
                    [
                        {
                            number: 2,
                            suit: CardSuit.Spade,
                        },
                    ],
                ];
                const card: Card = {
                    number: 2,
                    suit: CardSuit.Heart
                };
                expect(isCardMovableToColumn(dealtCards, card, 0)).toBe(false);
            });

            it('should return true - valid card from buffer/stacks', () => {
                const dealtCards: DealtCards = [
                    [
                        {
                            number: 2,
                            suit: CardSuit.Spade,
                        },
                    ],
                ];
                const card: Card = {
                    number: 1,
                    suit: CardSuit.Heart
                };
                expect(isCardMovableToColumn(dealtCards, card, 0)).toBe(true);
            });

            it('should return true - last card in column', () => {
                dealtCards = [
                    [
                        {
                            number: 1,
                            suit: CardSuit.Heart
                        },
                    ],
                    [
                        {
                            number: 2,
                            suit: CardSuit.Spade,
                        },
                    ],
                ];
                const card = dealtCards[0][0];

                expect(isCardMovableToColumn(dealtCards, card, 1)).toBe(true);
            });
        });
        it('should return true - many cards in column', () => {
            dealtCards = [
                [
                    {
                        number: 9,
                        suit: CardSuit.Club,
                    },
                    {
                        number: 11,
                        suit: CardSuit.Heart
                    },
                    {
                        number: 10,
                        suit: CardSuit.Spade
                    },
                ],
                [
                    {
                        number: 12,
                        suit: CardSuit.Club,
                    },
                ],
            ];
            let card = dealtCards[0][1];
            expect(isCardMovableToColumn(dealtCards, card, 1)).toBe(true);
            card = dealtCards[0][2];
            expect(isCardMovableToColumn(dealtCards, card, 1)).toBe(false);
        });

        it('should return true - empty target', () => {
            dealtCards = [
                [
                    {
                        number: 2,
                        suit: CardSuit.Heart
                    },
                    {
                        number: 1,
                        suit: CardSuit.Spade
                    },
                ],
                [
                ],
            ];
            let card = dealtCards[0][1];
            expect(isCardMovableToColumn(dealtCards, card, 1)).toBe(true);
            card = dealtCards[0][0];
            expect(isCardMovableToColumn(dealtCards, card, 1)).toBe(true);
        });
    });
});

