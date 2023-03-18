import { Card, CardSuit, DealtCards } from '../models/cards.d';
import { columnContainsCard } from './column.utils';
import { isCardMovableToColumn, isSingleCardSelection, moveCardToColumn, removeCardFromBoard } from './gameboard.utils';
import { dealCards, initDeck } from './deck.utils';

describe('gameboard utils', () => {
    let dealtCards: DealtCards;
    beforeEach(() => {
        const initialDeck = initDeck();
        dealtCards = dealCards(initialDeck);
    });

    describe('moveCardToColmun', () => {
        const targetColumnIndex = 3;


        it('should move card when it comes from stack/buffers - checkSource === false', () => {
            const card: Card = dealtCards[1][0];
            dealtCards[1] = [];
            moveCardToColumn(dealtCards, card, 0);
            expect(columnContainsCard(dealtCards[0], card)).toBe(true);
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
    });

    describe('isCardMovableToColumn', () => {
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

        describe('multiple cards', () => {
            it('should return false - random cards', () => {
                let card = dealtCards[0][1];
                expect(isCardMovableToColumn(dealtCards, card, 1)).toBe(false);
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

    describe('removeCard', () => {
        it('shouldn\´t remove card - undefined', () => {
            const columnLength = dealtCards[1].length;
            removeCardFromBoard(dealtCards, undefined);
            expect(dealtCards[1]).toHaveLength(columnLength);
        });

        it('should remove card', () => {
            const columnLength = dealtCards[1].length;
            removeCardFromBoard(dealtCards, dealtCards[1][0]);
            expect(dealtCards[1]).toHaveLength(columnLength - 1);
        });
    });

    describe('isSingleCardSelection', () => {

        it('should return true', () => {
            expect(isSingleCardSelection(dealtCards, dealtCards[0].at(-1))).toBe(true)
        });

        it('should return false - undefined card', () => {
            expect(isSingleCardSelection(dealtCards, undefined)).toBe(false)
        });

        it('should return false - card not found', () => {
            const card = dealtCards[0].pop();
            expect(isSingleCardSelection(dealtCards, card)).toBe(false)
        });

        it('should return false - card not at end', () => {
            const card = dealtCards[0][1];
            expect(isSingleCardSelection(dealtCards, card)).toBe(false)
        });
    });

});

