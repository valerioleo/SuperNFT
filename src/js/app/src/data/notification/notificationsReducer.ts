/* eslint-disable array-element-newline */
import {Map} from 'immutable';
import {handleActions} from 'redux-actions';
// import {createSafeAccessors} from '../../common/data/safeAccessor';
import {PUSH_NOTIFICATION, CLEAR_NOTIFICATION} from './notificationsActions';

// const SafeMap = createSafeAccessors({})(Map);

const handlePushNotification = (state, {payload}) => state.setIn(['notifications', payload.type], payload);

const handleClearNotification = state => state.set('notifications', Map({}));

const NotificationModel = Map({
  notifications: Map({})
});

export default handleActions(
  {
    [PUSH_NOTIFICATION]: handlePushNotification,
    [CLEAR_NOTIFICATION]: handleClearNotification
  },
  NotificationModel
);
