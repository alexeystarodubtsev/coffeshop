export interface Goods {
    imageUrl: string;
    name: string;
    price: number;
    info: string;
    tax: number;
}

export interface GoodsInBasket {
    name: string;
    qty: number;
}

export type OrderStatus = 'MAKING' | 'PREPARING' | 'DONE';

export interface Notification {
    title: string;
    date: Date;
}
