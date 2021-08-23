import React from 'react';
import Popover from '@material-ui/core/Popover';
import './Basket.scss';
import { useSelector, useDispatch } from 'react-redux';
import { actions, ModelState, asyncActions } from '../reducer';
import { GoodsInBasket } from '../types';
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
    const makeOrder = () => dispatch(asyncActions.makeOrderAsync());
    const handleMakeOrder = () => {
        makeOrder();
        onClose();
    };
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
                                .map(g => ({ ...goods[g], qty: basket[g].qty, discount: basket[g].totalDiscount }))
                                .map(({ imageUrl, name, qty, price, tax, discount }) => (
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
                                                {qty * price} (
                                                {!!discount &&
                                                    `-${Math.round(discount * price * qty * 100) / 100} discount `}
                                                +{Math.round(qty * price * tax * 100) / 100} tax)$
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className={`${CLASS}__footer`}>
                            <Divider variant="middle" />
                            <div className={`${CLASS}__footer-total`}>
                                <Typography className={`${CLASS}__footer-total-text`} component="p">
                                    Total with taxes and discounts
                                </Typography>
                                <Typography className={`${CLASS}__footer-total-sum`} component="p">
                                    {totalSum}$
                                </Typography>
                            </div>
                            <Button
                                className={`${CLASS}__footer-buy`}
                                color="secondary"
                                variant="contained"
                                onClick={handleMakeOrder}
                            >
                                Make order
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className={`${CLASS}__empty-basket`}>
                        <img alt="" className={`${CLASS}__empty-basket-img`} src={'/img/basket.svg'} />
                        <Typography className={`${CLASS}__empty-basket-text`} component="p">
                            It seems your basket is empty...
                        </Typography>
                    </div>
                )}
            </div>
        </Popover>
    );
};
