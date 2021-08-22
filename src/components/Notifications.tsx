import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModelState, actions } from '../reducer';
import './Notifications.scss';
import { Notification } from './Notification';

const CLASS = 'notifications';

export const Notifications: React.FC = () => {
    const notifications = useSelector<ModelState>(state => state.notifications) as ModelState['notifications'];
    const dispatch = useDispatch();
    const hideNotification = (date: Date) => dispatch(actions.deleteNotification(date));
    return (
        <div className={CLASS}>
            {notifications.map(notification => (
                <Notification
                    key={notification.date.getTime()}
                    notification={notification}
                    onClose={() => hideNotification(notification.date)}
                />
            ))}
        </div>
    );
};
