import { buffer } from 'stream/consumers';
import { Card, CardsBuffers, CardsStacks, CardSuit, DealtCards, Deck } from '../models/cards';
import { columnContainsCard } from './column.utils';
import { dealCards, initDeck, isCardMovableToColumn, moveCardToColumn } from './gameboard.utils';
import { initStacks } from './stacks.utils';

describe('gameboard utils', () => {
    describe('initDeck', () => {
        let deck: Deck;

        beforeEach(() => {
            deck = initDeck();
        });

        it('should contain all cards', () => {
            expect(deck).toHaveLength(52);
        });

        it('should initialize cards correctly', () => {
            const allCardsInitlized = deck
                .every((card) => card.suit && card.number);

            expect(allCardsInitlized).toBeTruthy();
        });

        it('should contain all the Spades and sorted by value', () => {
            const allSpades = deck
                .filter(({ suit }) => suit === CardSuit.Spade);
            const areSorted = allSpades
                .every((card, index) => index + 1 === card.number);
            expect(allSpades).toHaveLength(13);
            expect(areSorted).toBeTruthy();
        });

        it('should contain all the Clubs and sorted by value', () => {
            const allClubs = deck
                .filter(({ suit }) => suit === CardSuit.Club);
            const areSorted = allClubs
                .every((card, index) => index + 1 === card.number);

            expect(allClubs).toHaveLength(13);
            expect(areSorted).toBeTruthy();
        });

        it('should contain all the Hearts and sorted by value', () => {
            const allHearts = deck
                .filter(({ suit }) => suit === CardSuit.Heart);
            const areSorted = allHearts
                .every((card, index) => index + 1 === card.number);

            expect(allHearts).toHaveLength(13);
            expect(areSorted).toBeTruthy();
        });

        it('should contain all the Diamonds and sorted by value', () => {
            const allDiamonds = deck
                .filter(({ suit }) => suit === CardSuit.Diamond);
            const areSorted = allDiamonds
                .every((card, index) => index + 1 === card.number);

            expect(allDiamonds).toHaveLength(13);
            expect(areSorted).toBeTruthy();
        });
    });

    describe('shuffleCards', () => {
        let dealtCards: DealtCards;

        beforeEach(() => {
            const initialDeck = initDeck();
            dealtCards = dealCards(initialDeck);
        });

        it('should contain 6 columns', () => {
            expect(dealtCards).toHaveLength(8);
        });

        it('should contain 9 cards on the first 4  columns', () => {
            expect(dealtCards[0]).toHaveLength(7);
            expect(dealtCards[1]).toHaveLength(7);
            expect(dealtCards[2]).toHaveLength(7);
            expect(dealtCards[3]).toHaveLength(7);
        });

        it('should contain 8 cards on the last 2  columns', () => {
            expect(dealtCards[4]).toHaveLength(6);
            expect(dealtCards[5]).toHaveLength(6);
            expect(dealtCards[6]).toHaveLength(6);
            expect(dealtCards[7]).toHaveLength(6);
        });
    });

    describe('moveCardToColmun', () => {
        let dealtCards: DealtCards;
        const targetColumnIndex = 3;
        let buffers: CardsBuffers;
        let stacks: CardsStacks;

        beforeEach(() => {
            const initialDeck = initDeck();
            dealtCards = dealCards(initialDeck);
            stacks = initStacks();
            buffers = {
                0: undefined,
                1: undefined,
                2: undefined,
                3: undefined,
            };
        });

        it('should move a card from a column to another', () => {
            const card = dealtCards[0].at(-1); // last card from first colmun
            moveCardToColumn(dealtCards, buffers, stacks, card, targetColumnIndex)
            expect(columnContainsCard(dealtCards[3], card)).toBeTruthy();
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
        });

        it('should move many cards', () => {
            const card = dealtCards[0][0];
            moveCardToColumn(dealtCards, buffers, stacks, card, targetColumnIndex)
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
            expect(dealtCards[0]).toHaveLength(0);
            expect(columnContainsCard(dealtCards[3], card)).toBeTruthy();
            expect(dealtCards[3]).toHaveLength(14)
        });

        it('should not move undefined card', () => {
            const card = undefined; // last card from first colmun
            moveCardToColumn(dealtCards, buffers, stacks, card, targetColumnIndex)
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
            expect(columnContainsCard(dealtCards[3], card)).toBeFalsy();
        });

        it('should not move to an invalid targetIndex', () => {
            const card = dealtCards[0][0];
            moveCardToColumn(dealtCards, buffers, stacks, card, -1)
            expect(columnContainsCard(dealtCards[0], card)).toBeTruthy();
        });

        it('should not move card that aren\'t in the board', () => {
            const card = dealtCards[0].pop(); // pop removes the card from the board
            moveCardToColumn(dealtCards, buffers, stacks, card, 3);
            expect(columnContainsCard(dealtCards[0], card)).toBeFalsy();
            expect(columnContainsCard(dealtCards[3], card)).toBeFalsy();
        });
    });

    describe('isCardMovableToColumn', () => {
        let dealtCards: DealtCards;
        let buffers: CardsBuffers;

        beforeEach(() => {
            const initialDeck = initDeck();
            dealtCards = dealCards(initialDeck);
            buffers = {
                0: undefined,
                1: undefined,
                2: undefined,
                3: undefined,
            };
        });

        describe('invalid cards', () => {
            it('should return false - undefined card', () => {
                expect(isCardMovableToColumn(dealtCards, buffers, undefined, 3)).toBe(false);
            });

            it('should return false - invalid target', () => {
                expect(isCardMovableToColumn(dealtCards, buffers, dealtCards[0][0], -1)).toBe(false);
            });
        });

        describe('single', () => {
            it('should return false - card not movable to target', () => {
                const card = dealtCards[0].at(-1);
                expect(isCardMovableToColumn(dealtCards, buffers, card, 3)).toBe(false);
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
                expect(isCardMovableToColumn(dealtCards, buffers, card, 0)).toBe(false);
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
                expect(isCardMovableToColumn(dealtCards, buffers, card, 0)).toBe(true);
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

                expect(isCardMovableToColumn(dealtCards, buffers, card, 1)).toBe(true);
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
            expect(isCardMovableToColumn(dealtCards, buffers, card, 1)).toBe(true);
            card = dealtCards[0][2];
            expect(isCardMovableToColumn(dealtCards, buffers, card, 1)).toBe(false);
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
            expect(isCardMovableToColumn(dealtCards, buffers, card, 1)).toBe(true);
            card = dealtCards[0][0];
            expect(isCardMovableToColumn(dealtCards, buffers, card, 1)).toBe(true);
        });
    });
});

