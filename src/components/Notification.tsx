import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import { Notification as NotificationType } from '../types';
import Zoom from '@material-ui/core/Zoom';

interface Props {
    onClose: () => void;
    notification: NotificationType;
}

const CLASS = 'notifications';
const timeoutSec = 1000;
export const Notification: React.FC<Props> = ({ onClose, notification: { title } }) => {
    const [open, setState] = useState(false);
    useEffect(() => {
        setState(true);
    }, []);
    const handleClose = () => {
        setState(false);
        setTimeout(() => {
            onClose();
        }, timeoutSec);
    };

    return (
        <Zoom in={open} timeout={timeoutSec}>
            <div className={`${CLASS}__item`}>
                {title}
                <Button className={`${CLASS}__item-close-btn`} color="primary" size="small" onClick={handleClose}>
                    <ClearIcon />
                </Button>
            </div>
        </Zoom>
    );
};
