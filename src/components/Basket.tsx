import React from 'react';
import Popover from '@material-ui/core/Popover';
import './Basket.scss';

interface Props {
    anchorEl: HTMLButtonElement | null;
    onClose: () => void;
}
const CLASS = 'basket';

export const Basket: React.FC<Props> = ({ anchorEl, onClose }) => {
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
            <div className={CLASS}></div>
        </Popover>
    );
};
