/* eslint-disable array-element-newline */
import {handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {AsyncData} from '../../common/data/AsyncData';
import {SUBSCRIBE, LIST_SUBSCRIPTIONS} from './subscriptionActions';

const handleSubscribe = (state, {payload}) => state.set('subscribeResult', payload);
const handleListSubscriptions = (state, {payload}) => state.set('listSubscriptionsResult', payload);

const SubscribeModel = Map({
  subscribeResult: AsyncData.Empty(),
  listSubscriptinsResult: AsyncData.Empty()
});

export default handleActions({
  [SUBSCRIBE]: handleSubscribe,
  [LIST_SUBSCRIPTIONS]: handleListSubscriptions
}, SubscribeModel);
