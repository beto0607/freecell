import { buffer } from "stream/consumers";
import { Card, CardsBuffers, CardSuit } from "../models/cards.d";
import { BUFFER_KEYS, getBufferIndexForCard, getFreeBuffer, isCardInBuffers, isCardMovableToBuffer, removeCardFromBuffers } from "./buffers.utils";

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

    describe('isCardMovableToBuffer', () => {

        it('should return false - card undefined', () => {
            expect(isCardMovableToBuffer(buffers, 0, undefined)).toBe(false);
        })

        it('should return false - buffer occupied', () => {
            buffers[0] = mockCard;
            expect(isCardMovableToBuffer(buffers, 0, mockCard)).toBe(false);
        })

        it('should return true', () => {
            buffers[0] = mockCard;
            expect(isCardMovableToBuffer(buffers, 1, mockCard)).toBe(true);
        })
    });

    describe('getFreeBuffer', () => {
        it('should return first key', () => {
            expect(getFreeBuffer(buffers)).toBe(BUFFER_KEYS.at(0));
        });

        it('should return last key', () => {
            buffers[0] = buffers[1] = buffers[2] = mockCard;
            expect(getFreeBuffer(buffers)).toBe(BUFFER_KEYS.at(-1));
        });

        it('should return undefined', () => {
            buffers[0] = buffers[1] = buffers[2] = buffers[3] = mockCard;
            expect(getFreeBuffer(buffers)).toBeUndefined();
        });
    });
});
