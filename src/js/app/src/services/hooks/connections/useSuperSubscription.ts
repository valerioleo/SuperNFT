/* eslint-disable no-mixed-operators */
import {useDispatch, useSelector} from 'react-redux';
import {prop} from '../../../common/fn';
import {subscribe} from '../../../data/subscription/subscriptionActions';

export default () => {
  const dispatch = useDispatch();
  const subscription = useSelector(prop('subscription'));

  return {
    subscribe: (dispatch)['∘'](subscribe),
    subscription
  };
};
