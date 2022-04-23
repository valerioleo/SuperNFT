/* eslint-disable array-element-newline */
import {handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {AsyncData} from '../../common/data/AsyncData';
import {createSafeAccessors} from '../../common/data/safeAccessor';
import {immutableGet} from '../../common/fn';
import {
  GET_CONTRACT_EVENTS,
  CALL_CONTRACT_METHOD
} from './smartContractActions';

const handleLoadContractEvents = (state, {payload}) => {
  const path = [
    'loadContractEventsResult',
    payload.data.get('contractInterface'),
    payload.data.get('eventName')
  ];

  return state.setIn(path, payload.map(immutableGet('list')));
};

const handleCallContractMethod = (state, {payload}) => {
  const path = [
    'callContractMethodResult',
    payload.data.get('contractInterface'),
    payload.data.get('key') // use key instead of method as it allows more customisations
  ];

  // set smart contract
  return state.setIn(path, payload.map(immutableGet('contractResult')));
};

const SafeMap = createSafeAccessors(AsyncData.Empty())(Map);
const SmartContractModel = Map({
  loadContractEventsResult: SafeMap({}),
  callContractMethodResult: SafeMap({})
});

export default handleActions(
  {
    [GET_CONTRACT_EVENTS]: handleLoadContractEvents,
    [CALL_CONTRACT_METHOD]: handleCallContractMethod
  },
  SmartContractModel
);
