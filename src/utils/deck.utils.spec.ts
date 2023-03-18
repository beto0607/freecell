import { CardSuit, DealtCards, Deck } from '../models/cards.d';
import { dealCards, initDeck } from './deck.utils';

describe('deckUtils', () => {
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
});
