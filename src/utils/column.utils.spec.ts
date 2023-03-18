import { Card, DealtCards } from "../models/cards.d";
import { columnContainsCard, getCardIndexInColumn, getColumnIndexForCard, isLastCardForColumn } from "./column.utils";
import { dealCards, initDeck } from "./deck.utils";

describe('column utils', () => {
    let column: Array<Card>;

    beforeEach(() => {
        column = initDeck();
    });

    describe('getCardIndexInColumn', () => {

        it('should return -1 - undefined', () => {
            expect(getCardIndexInColumn(column, undefined)).toEqual(-1);
        })

        it('should return -1 - card doesn\'t exists', () => {
            const card = column.pop();
            expect(getCardIndexInColumn(column, card)).toEqual(-1);
        })

        it('should return 0', () => {
            const card = column[0];
            expect(getCardIndexInColumn(column, card)).toEqual(0);
        })

        it('should return 10', () => {
            const card = column[10];
            expect(getCardIndexInColumn(column, card)).toEqual(10);
        })
    });

    describe('columnContainsCard', () => {

        it('should return false - undefined', () => {
            expect(columnContainsCard(column, undefined)).toBe(false);
        });

        it('should return false - card doesn\'t exists', () => {
            const card = column.pop();
            expect(columnContainsCard(column, card)).toBe(false);
        });

        it('should return true', () => {
            expect(columnContainsCard(column, column[10])).toBe(true);
        });
    });

    describe('getColumnIndexForCard', () => {
        let board: DealtCards;

        beforeEach(() => {
            board = dealCards(initDeck());
        });

        it('should return -1 - card doesn\'t exists', () => {
            const card = board[0].pop();
            expect(getColumnIndexForCard(board, card)).toBe(-1);
        });

        it('should return -1 - empty board', () => {
            const card = board[0].pop();
            board = [[], [], []];
            expect(getColumnIndexForCard(board, card)).toBe(-1);
        });

        it('should return 3', () => {
            const card = board[3][0];
            expect(getColumnIndexForCard(board, card)).toBe(3);
        });
    });

    describe('isLastCardForColumn', () => {

        it('should return true', () => {
            expect(isLastCardForColumn(column, column.at(-1))).toBe(true);
        });

        it('should return false - undefined card', () => {
            expect(isLastCardForColumn(column, undefined)).toBe(false);
        });

        it('should return false - empty column', () => {
            expect(isLastCardForColumn([], column[0])).toBe(false);
        });
        it('should return false - card not found', () => {
            const card = column.pop();
            expect(isLastCardForColumn(column, card)).toBe(false);
        });
    });
});
