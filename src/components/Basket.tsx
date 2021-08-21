import React from 'react';
import Popover from '@material-ui/core/Popover';
import './Basket.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actions, ModelState } from '../reducer';
import { GoodsInBasket, Goods } from '../types';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

interface Props {
    anchorEl: HTMLButtonElement | null;
    onClose: () => void;
}
const CLASS = 'basket';

export const Basket: React.FC<Props> = ({ anchorEl, onClose }) => {
    const basket = useSelector<ModelState>(state => state.basket) as ModelState['basket'];
    const goods = useSelector<ModelState>(state => state.goods) as ModelState['goods'];
    const totalSum = useSelector<ModelState>(state => state.totalSum) as ModelState['totalSum'];
    const dispatch = useDispatch();
    const addToBasket = (goods: GoodsInBasket) => dispatch(actions.addToBasket(goods));
    const open = Boolean(anchorEl);
    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={open}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            onClose={onClose}
        >
            <div className={CLASS}>
                {Object.keys(basket).length ? (
                    <>
                        <div className={`${CLASS}__container`}>
                            {Object.keys(basket)
                                .map(g => ({ ...goods[g], qty: basket[g].qty }))
                                .map(({ imageUrl, name, qty, price, tax }) => (
                                    <div key={name} className={`${CLASS}__item`}>
                                        <img alt={name} className={`${CLASS}__item-image`} src={imageUrl} />
                                        <Typography className={`${CLASS}__item-name`} component="p">
                                            {name}
                                        </Typography>
                                        <div className={`${CLASS}__item-actions`}>
                                            <Button
                                                className={`${CLASS}__item-actions-button`}
                                                color="primary"
                                                size="small"
                                                onClick={() => addToBasket({ name, qty: qty - 1 })}
                                            >
                                                <RemoveIcon />
                                            </Button>
                                            {qty}
                                            <Button
                                                className={`${CLASS}__item-actions-button`}
                                                color="primary"
                                                size="small"
                                                onClick={() => addToBasket({ name, qty: qty + 1 })}
                                            >
                                                <AddIcon />
                                            </Button>
                                            <Typography
                                                className={`${CLASS}__item-actions-price`}
                                                color="textSecondary"
                                                component="p"
                                            >
                                                {qty * price} (+{Math.floor(qty * price * tax * 100) / 100} taxes)$
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className={`${CLASS}__footer`}>
                            <Divider variant="middle" />
                            <div className={`${CLASS}__footer-total`}>
                                <Typography className={`${CLASS}__footer-total-text`} component="p">
                                    Total with taxes
                                </Typography>
                                <Typography className={`${CLASS}__footer-total-sum`} component="p">
                                    {totalSum}$
                                </Typography>
                            </div>
                            <Button className={`${CLASS}__footer-buy`} color="secondary" variant="contained">
                                Make order
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className={`${CLASS}__empty-basket`}>
                        <img className={`${CLASS}__empty-basket-img`} src={'/img/basket.svg'} />
                        <Typography className={`${CLASS}__empty-basket-text`} component="p">
                            It seems your basket is empty...
                        </Typography>
                    </div>
                )}
            </div>
        </Popover>
    );
};
