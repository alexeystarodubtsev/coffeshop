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
