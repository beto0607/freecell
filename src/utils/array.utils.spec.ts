import { shuffleArray } from './array.utils';

describe('array utils', () => {
    describe('shuffleArray', () => {
        let arr: number[];

        beforeEach(() => {
            arr = [1, 2, 3];
        });

        it('should shuffle an array', () => {
            // cannot test more that the refenrces, since the elments can mathc the original array
            const shuffledArray = shuffleArray(arr);
            expect(shuffledArray).not.toBe(arr);
        });
    });
});

