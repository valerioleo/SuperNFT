import union from 'folktale/adt/union/union';
import {constant} from '../fn';

export const TransactionResult = union('TransactionResult', {
  Unsigned: constant(true),
  Signed: data => ({data}),
  Mined: data => ({data}),
  Confirmed: data => ({data}),
  Failure: (error, data) => ({error, data})
});

