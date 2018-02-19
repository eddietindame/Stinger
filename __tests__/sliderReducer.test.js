import swiperReducer from '../src/reducers/swiperReducer';

describe('Swiper Reducer', () => {

    it('has a default state', () => {
        expect(
            swiperReducer(undefined, {
                type: undefined,
                index: undefined
            })
        ).toEqual({
            index: 1
        });
    });

    it('can handle SLIDE_INDEX_CHANGED', () => {
        expect(
            swiperReducer(undefined, {
                type: 'SLIDE_INDEX_CHANGED',
                index: 2
            })
        ).toEqual({
            index: 2
        });
    });

});
