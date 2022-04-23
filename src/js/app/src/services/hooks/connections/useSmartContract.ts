import {useDispatch, useSelector} from 'react-redux';
import {prop} from '../../../common/fn';
import {getContractResult as getContractResultService} from '../../../common/data/utils';
import {getContractEvents, callContractMethod} from '../../../data/smart-contract/smartContractActions';

export default () => {
  const dispatch = useDispatch();
  const smartContract = useSelector(prop('smartContract'));

  const getContractResult = (contract, key) => getContractResultService(
    smartContract,
    contract,
    key
  );

  return {
    smartContract,
    getContractResult,
    getContractEvents: (dispatch)['∘'](getContractEvents),
    callContractMethod: (dispatch)['∘'](callContractMethod)
  };
};
