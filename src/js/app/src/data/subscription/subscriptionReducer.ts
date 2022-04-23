/* eslint-disable array-element-newline */
import {handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {AsyncData} from '../../common/data/AsyncData';
import {SUBSCRIBE} from './subscriptionActions';

const handleSubscribe = (state, {payload}) => state.set('subscribeResult', payload);

const SubscribeModel = Map({
  subscribeResult: AsyncData.Empty()
});

export default handleActions({
  [SUBSCRIBE]: handleSubscribe
}, SubscribeModel);
