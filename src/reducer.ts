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
}
const initialState: ModelState = {
    basket: {},
    goods: {
        cappuccino: {
            name: 'cappuccino',
            price: 5,
            imageUrl: '/img/cappuccino.jfif',
            info: 'An espresso-based coffee drink that originated in Italy, and is simply prepared with steamed milk foam (microfoam)'
        }
    }
};

const reducer: Reducer<ModelState, ExtractActions<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_BASKET:
            const newBasket = { ...state.basket };

            if (action.payload.qty <= 0 && action.payload.name in state.basket) delete newBasket[action.payload.name];
            else if (action.payload.qty > 0) newBasket[action.payload.name] = action.payload;

            return {
                ...state,
                basket: newBasket
            };
        default:
            return state;
    }
};

export default reducer;
