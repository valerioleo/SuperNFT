/* eslint-disable import/no-unresolved */
import {createAction} from 'redux-actions';

export const PUSH_NOTIFICATION = 'NOTIFICATION:PUSH_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'NOTIFICATION:CLEAR_NOTIFICATION';

export const pushNotification = notification => createAction(PUSH_NOTIFICATION)(notification);

export const clearNotification = createAction(CLEAR_NOTIFICATION);
