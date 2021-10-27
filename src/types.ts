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
    discount?: number[];
    totalDiscount?: number;
}

export enum OrderStatuses {
    MAKING = 'MAKING',
    PREPARING = 'PREPARING',
    DONE = 'DONE'
}
export type OrderStatusType = keyof typeof OrderStatuses;
export interface Notification {
    title: string;
    date: Date;
}

export interface Discount {
    goods: string[];
    discount: number;
}
