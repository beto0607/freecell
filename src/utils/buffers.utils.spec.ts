import { Card, CardsBuffers, CardSuit } from "../models/cards";
import { getBufferIndexForCard, isCardInBuffers, removeCardFromBuffers } from "./buffers.utils";

describe('buffer utils', () => {
    const mockCard: Card = {
        number: 1,
        suit: CardSuit.Heart
    };

    let buffers: CardsBuffers;

    beforeEach(() => {
        buffers = {
            0: undefined,
            1: undefined,
            2: undefined,
            3: undefined,
        }
    });

    describe('getBufferIndexForCard', () => {

        it('should return -1 - no card in buffer', () => {
            expect(getBufferIndexForCard(buffers, mockCard)).toBe(-1);
        });

        it('should return -1 - undefined card', () => {
            buffers[0] = mockCard;
            expect(getBufferIndexForCard(buffers, undefined)).toBe(-1);
        });

        it('should return correct index', () => {
            buffers[1] = mockCard;
            expect(getBufferIndexForCard(buffers, mockCard)).toBe(1);
        });
    });

    describe('isCardInBuffers', () => {

        it('should return false - no card in buffer', () => {
            expect(isCardInBuffers(buffers, mockCard)).toBe(false);
        });

        it('should return false - undefined card', () => {
            expect(isCardInBuffers(buffers, undefined)).toBe(false);
        });

        it('should return true', () => {
            buffers[3] = mockCard;
            expect(isCardInBuffers(buffers, mockCard)).toBe(true);
        });
    });

    describe('removeCardFromBuffers', () => {
        it('should remove card from buffers', () => {
            buffers[0] = mockCard;
            removeCardFromBuffers(buffers, mockCard);
            expect(buffers[0]).toBeUndefined();
        });
        it('should not remove card from buffers - card not found', () => {
            buffers[0] = {
                number: 3,
                suit: CardSuit.Diamond
            };
            removeCardFromBuffers(buffers, mockCard);
            expect(buffers[0]).not.toBeUndefined();
        });
    });
});
