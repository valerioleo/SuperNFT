/* eslint-disable func-names */
/* eslint-disable no-shadow */
import union from 'folktale/adt/union/union';
import {constant, prop, flatten} from '../fn';

export const AsyncData = union('AsyncData', {
  Empty: () => true,
  Loading: data => ({data}),
  Success: data => ({data}),
  Failure: (error, data) => ({error, data})
});

export const allSuccess = asyncDataList => asyncDataList.every(
  a => a.matchWith({
    Empty: () => false,
    Loading: () => false,
    Success: () => true,
    Failure: () => false
  })
);

export const someSuccess = asyncDataList => asyncDataList.some(
  a => a.matchWith({
    Empty: () => false,
    Loading: () => false,
    Success: () => true,
    Failure: () => false
  })
);

// AsyncData[] -> AsyncData
// if any success return success
export const AsyncDataSome = asyncDataList => someSuccess(asyncDataList)
  ? AsyncData.Success()
  : AsyncData.Loading();

// AsyncData[] -> AsyncData
// if all success return success
export const AsyncDataAll = asyncDataList => allSuccess(asyncDataList)
  ? AsyncData.Success(asyncDataList.reduce((acc, result) => [...acc, result.data], []))
  : AsyncData.Loading();

AsyncData.map = function (f) {
  const identity = () => this;

  return this.matchWith({
    Empty: identity,
    Loading: identity,
    Success: ({data}) => AsyncData.Success(f(data)),
    Failure: identity
  });
};

AsyncData.chain = function (next) {
  const identity = () => this;
  return this.matchWith({
    Empty: identity,
    Loading: identity,
    Success: ({data}) => next.matchWith({
      Empty: constant(next),
      Loading: constant(next),
      Success: ({data: data2}) => AsyncData.Success(flatten([data, data2])),
      Failure: constant(next)
    }),
    Failure: identity
  });
};

AsyncData.after = function (nested) {
  const allSuccess = AsyncDataAll([this, nested]);

  return allSuccess.map(() => {
    const data = this.mapPattern('Success', null, prop('data'));
    const innerData = nested.mapPattern('Success', null, prop('data'));

    return [data, innerData];
  });
};

AsyncData.mapPattern = function (patternName, defaultVal, f) {
  return this.matchWith({
    Empty: constant(defaultVal),
    Loading: constant(defaultVal),
    Success: constant(defaultVal),
    Failure: constant(defaultVal),

    // will override one of the above patterns
    [patternName]: f
  });
};

