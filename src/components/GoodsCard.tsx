import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GoodsCard.scss';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { actions, ModelState } from '../reducer';
import { GoodsInBasket } from '../types';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    info: string;
}

const CLASS = 'goods-card';

export const GoodsCard: React.FC<Props> = ({ imageUrl, name, price, info }) => {
    const dispatch = useDispatch();
    const addToBasket = (goods: GoodsInBasket) => dispatch(actions.addToBasket(goods));
    const countInBasket = useSelector<ModelState>(state => state.basket[name]?.qty || 0) as number;
    return (
        <Card className={CLASS}>
            <CardActionArea>
                <CardMedia className={`${CLASS}__media`} image={imageUrl} title={name} />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h5">
                        {name}
                    </Typography>
                    <Typography color="textSecondary" component="p" variant="body2">
                        {info}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={`${CLASS}__actions`}>
                <Typography className={`${CLASS}__actions-price`} component="p">
                    {price}$
                </Typography>
                {countInBasket ? (
                    <div className={`${CLASS}__actions-buttons`}>
                        <Button
                            color="primary"
                            size="small"
                            onClick={() => addToBasket({ name, qty: countInBasket - 1 })}
                        >
                            <RemoveIcon />
                        </Button>
                        {countInBasket}
                        <Button
                            color="primary"
                            size="small"
                            onClick={() => addToBasket({ name, qty: countInBasket + 1 })}
                        >
                            <AddIcon />
                        </Button>
                    </div>
                ) : (
                    <Button color="primary" size="small" onClick={() => addToBasket({ name, qty: 1 })}>
                        <ShoppingBasketIcon />
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

// export const GoodsCard = connect(state => state, mapDispatchToProps)(_GoodsCard);
