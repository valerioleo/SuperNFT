import {noop} from '../fn';

export const readContractResult = (result, callback, shouldThrow = false) => {
  result
    .matchWith({
      Empty: callback.Empty || noop,
      Loading: callback.Loading || noop,
      Success: ({data: contractResult}) => contractResult.matchWith({
        Call: callback.Call || noop,
        Tx: ({txResult}) => txResult.matchWith({
          Unsigned: callback.Unsigned || noop,
          Signed: callback.Signed || noop,
          Mined: callback.Mined || noop,
          Confirmed: callback.Confirmed || noop,
          Failure: callback.Failure || noop
        })
      }),
      Failure: error => {
        if(shouldThrow) {
          throw error;
        }
      }
    });
};

export const getContractResult = (smartContract, method, key) => smartContract
  .get('callContractMethodResult')
  .safeGetIn([method, key]);
