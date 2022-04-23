import {useDispatch, useSelector} from 'react-redux';
import {prop} from '../../../common/fn';
import {pushNotification, clearNotification} from '../../../data/notification/notificationsActions';

export default () => {
  const dispatch = useDispatch();
  const notifications = useSelector(prop('notifications'));

  return {
    notifications,
    pushNotification: (dispatch)['∘'](pushNotification),
    clearNotification: (dispatch)['∘'](clearNotification)
  };
};
