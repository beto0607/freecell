import { Card, CardsStacks, CardSuit, DealtCards } from "../models/cards";
import { dealCards, initDeck } from "./deck.utils";
import { initStacks, isCardInStack, isCardInStacks, isCardMovableToStack, moveCardToColumnFromStacks, removeCardFromStacks } from "./stacks.utils";

describe('stack utils', () => {
    const mockCard: Card = {
        number: 1,
        suit: CardSuit.Heart
    };
    const mockCard2: Card = {
        number: 3,
        suit: CardSuit.Spade
    };
    let stacks: CardsStacks;

    beforeEach(() => {
        stacks = initStacks();
    });

    describe('initStacks', () => {
        it('should initialize a new empty stack', () => {
            expect(stacks[CardSuit.Club]).toHaveLength(0);
            expect(stacks[CardSuit.Heart]).toHaveLength(0);
            expect(stacks[CardSuit.Diamond]).toHaveLength(0);
            expect(stacks[CardSuit.Spade]).toHaveLength(0);
        });
    });

    describe('isCardInStack', () => {
        beforeEach(() => {
            stacks[CardSuit.Heart].push(mockCard);
        });

        it('should return false - undefined card', () => {
            expect(isCardInStack(stacks[CardSuit.Heart], undefined)).toBe(false);
        });

        it('should return false - card not found', () => {
            expect(isCardInStack(stacks[CardSuit.Heart], mockCard2)).toBe(false);
        });

        it('should return false - empty stack', () => {
            stacks[CardSuit.Heart].push(mockCard);
            expect(isCardInStack([], mockCard)).toBe(false);
        });

        it('should return true', () => {
            expect(isCardInStack(stacks[CardSuit.Heart], mockCard)).toBe(true);
        });
    });

    describe('isCardInStacks', () => {
        it('should return false', () => {
            expect(isCardInStacks(stacks, mockCard)).toBe(false);
        });

        it('should return true', () => {
            stacks[CardSuit.Heart].push(mockCard);
            expect(isCardInStacks(stacks, mockCard)).toBe(true);
        });
    });

    describe('removeCardFromStacks', () => {
        beforeEach(() => {
            stacks[CardSuit.Heart].push(mockCard);
        });

        it('should remove the card from the stacks', () => {
            removeCardFromStacks(stacks, mockCard);
            expect(stacks[CardSuit.Heart]).toHaveLength(0)
        });

        it('shouldn\'t remove card from the stacks - card undefined', () => {
            removeCardFromStacks(stacks, undefined);
            expect(stacks[CardSuit.Heart]).toHaveLength(1)
        });

        it('shouldn\'t remove card from the stacks - card not found', () => {
            removeCardFromStacks(stacks, mockCard2);
            expect(stacks[CardSuit.Heart]).toHaveLength(1)
        });
    });

    describe('isCardMovableToStack', () => {
        it('should return false - undefined card', () => {
            expect(isCardMovableToStack(stacks, CardSuit.Heart, undefined)).toBe(false);
        });

        it('should return false - diff suit', () => {
            expect(isCardMovableToStack(stacks, CardSuit.Heart, mockCard2)).toBe(false);
        });

        it('should return false - wrong number', () => {
            expect(isCardMovableToStack(stacks, CardSuit.Heart, { ...mockCard, number: 2 })).toBe(false);
        });

        it('should return true', () => {
            expect(isCardMovableToStack(stacks, CardSuit.Heart, mockCard)).toBe(true);
        });
    });
    describe('moveCardToColumnFromStacks', () => {
        let board: DealtCards;

        beforeEach(() => {
            board = dealCards(initDeck());
            stacks[CardSuit.Heart].push(mockCard);
        });

        it('should not move anything - undefined card', () => {
            const columnLength = board[0].length;
            moveCardToColumnFromStacks(board, stacks, undefined, 0);
            expect(board[0]).toHaveLength(columnLength);
        });

        it('should not move anything - invalid column', () => {
            moveCardToColumnFromStacks(board, stacks, mockCard, -1);
            expect(stacks[CardSuit.Heart]).toHaveLength(1);
        });

        it('should move card', () => {
            const columnLength = board[0].length;
            moveCardToColumnFromStacks(board, stacks, mockCard, 0);
            expect(board[0]).toHaveLength(columnLength + 1);
            expect(stacks[CardSuit.Heart]).toHaveLength(0);
        });
    });
});
