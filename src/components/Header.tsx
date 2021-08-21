import React from 'react';
import './Header.scss';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { Basket } from './Basket';

import { ModelState } from '../reducer';
const CLASS = 'header';

export const Header: React.FC = () => {
    const countInBasket = useSelector<ModelState>(state => Object.keys(state.basket).length) as number;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className={CLASS}>
            <div className={`${CLASS}__text`}> BEE COFFEE </div>
            <div className={`${CLASS}__basket`}>
                <IconButton aria-label="cart" onClick={handleClick}>
                    {countInBasket ? (
                        <Badge badgeContent={countInBasket} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    ) : (
                        <ShoppingCartIcon />
                    )}
                </IconButton>
            </div>
            <Basket anchorEl={anchorEl} onClose={handleClose} />
        </header>
    );
};
