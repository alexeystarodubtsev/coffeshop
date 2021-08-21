import { Reducer } from 'redux';
import { Goods, GoodsInBasket } from './types';
import { createAction, ExtractActions } from './utils';

export const types = {
    ADD_TO_BASKET: 'ADD_TO_BASKET'
};
export const actions = {
    addToBasket: (good: GoodsInBasket) => createAction(types.ADD_TO_BASKET, good)
};

export interface ModelState {
    basket: { [key in string]: GoodsInBasket };
    goods: { [key in string]: Goods };
    totalSum: number;
}
const initialState: ModelState = {
    basket: {},
    goods: {
        Cappuccino: {
            name: 'Cappuccino',
            price: 5,
            tax: 0.15,
            imageUrl: '/img/cappuccino.jpg',
            info: 'An espresso-based coffee drink that originated in Italy, and is simply prepared with steamed milk foam (microfoam)'
        },
        Latte: {
            name: 'Latte',
            price: 4,
            tax: 0.2,
            imageUrl: '/img/latte.jpg',
            info: 'A coffee drink of Italian origin made with espresso and steamed milk.'
        },
        Americano: {
            name: 'Americano',
            price: 3,
            tax: 0.2,
            imageUrl: '/img/americano.jpg',
            info: 'A coffee drink prepared by diluting an espresso with hot water'
        },
        Lemonade: {
            name: 'Lemonade',
            price: 3,
            tax: 0.09,
            imageUrl: '/img/limonade.jpg',
            info: 'Fresh drink in summer heat'
        },
        Sandwich: {
            name: 'Sandwich',
            price: 3,
            tax: 0.15,
            imageUrl: '/img/sandwich.jpg',
            info: 'Sandwich with chicken, vegetables and souse'
        },
        Cheesecake: {
            name: 'Cheesecake',
            price: 7,
            tax: 0.1,
            imageUrl: '/img/cheesecake.jpg',
            info: 'A dessert consisting of a creamy filling usually containing cheese baked in a pastry or pressed-crumb shell.'
        },
        'Pancakes with honey': {
            name: 'Pancakes with honey',
            price: 10,
            tax: 0.15,
            imageUrl: '/img/pancakes.jpg',
            info: 'Pancakes with honey.'
        }
    },
    totalSum: 0
};

const reducer: Reducer<ModelState, ExtractActions<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_BASKET:
            const newBasket = { ...state.basket };

            if (action.payload.qty <= 0 && action.payload.name in state.basket) delete newBasket[action.payload.name];
            else if (action.payload.qty > 0) newBasket[action.payload.name] = action.payload;

            return {
                ...state,
                basket: newBasket,
                totalSum:
                    Math.floor(
                        (Object.keys(newBasket).length
                            ? Object.keys(newBasket)
                                  .map(g => state.goods[g].price * newBasket[g].qty * (1 + state.goods[g].tax))
                                  .reduce((acc, val) => acc + val)
                            : 0) * 100
                    ) / 100
            };
        default:
            return state;
    }
};

export default reducer;
