import { Reducer } from 'redux';
import { Goods, GoodsInBasket, OrderStatus, Notification } from './types';
import { createAction, ExtractActions } from './utils';

export const types = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    MAKE_ORDER: 'MAKE_ORDER',
    DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    FINISH_ORDER: 'FINISH_ORDER'
};

export const actions = {
    addToBasket: (good: GoodsInBasket) => createAction(types.ADD_TO_BASKET, good),
    makeOrder: (date: Date) => createAction(types.MAKE_ORDER, { date }),
    deleteNotification: (date: Date) => createAction(types.DELETE_NOTIFICATION, { date }),
    finishOrder: (orderIndex: number, date: Date) => createAction(types.FINISH_ORDER, { orderIndex, date })
};

export const asyncActions = {
    makeOrderAsync: () => (dispatch: any, getState: () => ModelState) => {
        const { orderStatuses } = getState();
        const orderIndex = orderStatuses.length - 1;
        dispatch(actions.makeOrder(new Date()));
        setTimeout(() => {
            dispatch(actions.finishOrder(orderIndex, new Date()));
        }, 25000);
    }
};

export interface ModelState {
    basket: { [key in string]: GoodsInBasket };
    goods: { [key in string]: Goods };
    totalSum: number;
    orderStatuses: OrderStatus[];
    notifications: Notification[];
}
const initialState: ModelState = {
    basket: {},
    orderStatuses: ['MAKING'],
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
    totalSum: 0,
    notifications: []
};

const reducer: Reducer<ModelState, ExtractActions<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_BASKET:
            const newBasket = { ...state.basket };
            const goods = action.payload as GoodsInBasket;
            if (goods.qty <= 0 && goods.name in state.basket) delete newBasket[goods.name];
            else if (goods.qty > 0) newBasket[goods.name] = goods;

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
        case types.DELETE_NOTIFICATION:
            const dateNotification = (action.payload as { date: Date }).date;
            return {
                ...state,
                notifications: state.notifications.filter(n => n.date !== dateNotification)
            };
        case types.MAKE_ORDER:
            const { date } = action.payload as { date: Date };
            return {
                ...state,
                basket: {},
                orderStatuses: [...state.orderStatuses].splice(-1, 1, 'PREPARING', 'MAKING'),
                notifications: [
                    ...state.notifications,
                    { title: `Thank you for order! We've started to prepare your order...`, date }
                ]
            };
        case types.FINISH_ORDER:
            const { orderIndex, date: dateFinish } = action.payload as { orderIndex: number; date: Date };
            return {
                ...state,
                orderStatuses: [...state.orderStatuses].splice(orderIndex, 1, 'DONE'),
                notifications: [
                    ...state.notifications,
                    { title: 'Your order is ready! Please take it and enjoy!', date: dateFinish }
                ]
            };
        default:
            return state;
    }
};

export default reducer;
