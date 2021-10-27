import reducer, { initialState, actions } from './reducer';

describe('reducer', () => {
    describe('actions', () => {
        it('add to basket', () => {
            const firstGood = { name: 'Latte', qty: 2 };
            const secondGood = { name: 'Sandwich', qty: 1 };
            const expectedState = {
                ...initialState,
                basket: {
                    Latte: { ...firstGood, totalDiscount: 0.1, discount: [0.2] },
                    Sandwich: { ...secondGood, totalDiscount: 0.2, discount: [0.2] }
                },
                totalSum: 11.65
            };
            expect(
                reducer(reducer(initialState, actions.addToBasket(firstGood)), actions.addToBasket(secondGood))
            ).toEqual(expectedState);
        });
    });
});
