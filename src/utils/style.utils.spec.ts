import { classes } from './style.utils';

describe('style utils', () => {

    describe('classes', () => {
        it('should return all elemens joined', () => {
            expect(classes('a', 'b', 'c')).toStrictEqual('a b c');
        });
        it('should an empty string when called without params' , () => {
            expect(classes()).toStrictEqual('');
        });
    });

});
