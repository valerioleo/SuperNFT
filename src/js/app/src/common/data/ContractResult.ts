/* eslint-disable func-names */
import union from 'folktale/adt/union/union';

export const ContractResult = union('ContractResult', {
  Tx: txResult => ({txResult}),
  Call: data => ({data})
});

ContractResult.unwrapCallResult = function unwrapCallResult() {
  return this.matchWith({
    Tx: () => {
      throw new Error('Could not unwrap Tx Result');
    },
    Call: ({result}) => result
  });
};

ContractResult.unwrapTxResult = function unwrapTxResult() {
  return this.matchWith({
    Tx: ({result}) => result,
    Call: () => {
      throw new Error('Could not unwrap Call Result');
    }
  });
};

ContractResult.mapTx = function (f) {
  const identity = () => this;

  return this.matchWith({
    Call: identity,
    Tx: ({txResult}) => ContractResult.Tx(f(txResult))
  });
};

ContractResult.mapCall = function (f) {
  const identity = () => this;

  return this.matchWith({
    Call: ({data}) => ContractResult.Call(f(data)),
    Tx: identity
  });
};

