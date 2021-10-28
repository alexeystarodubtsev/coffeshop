import { render } from '@testing-library/react';
import { Notification } from './Notification';
import React from 'react';
import { Notification as NotificationType } from '../types';
import '@testing-library/jest-dom/extend-expect';

describe('Notifications', () => {
    const notification: NotificationType = { title: 'test notification', date: new Date() };
    it('Appearing notification', () => {
        const { container, getByText } = render(<Notification notification={notification} onClose={() => undefined} />);
        expect(container.firstChild).toMatchSnapshot();
        expect(container.firstChild).toBeDefined();
        expect(getByText('test notification')).toBeInTheDocument();
    });
});
