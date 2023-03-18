import { Card, CardsBuffers, CardSuit } from "../models/cards";
import { getBufferIndexForCard, isCardInBuffers } from "./buffers.utils";

describe('buffer utils', () => {
    const mockCard: Card = {
        number: 1,
        suit: CardSuit.Heart
    };

    let buffers: CardsBuffers ; 

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

    describe.skip('removeCardFromBuffers', ()=>{


    });
});
