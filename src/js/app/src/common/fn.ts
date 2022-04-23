/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
import identity from 'folktale/core/lambda/identity';
import lodashGet from 'lodash.get';

// composition hack
// eslint-disable-next-line no-prototype-builtins
if(!Function.prototype.hasOwnProperty('∘')) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Function.prototype, '∘', {
    enumerable: false,
    value(f) {
      return x => this(f(x));
    }
  });
}

export const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));
export const partialSpread = (fn, obj = {}) => (restObj = {}) => fn.call(this, {...obj, ...restObj});

export const prop = key => obj => obj[key];
export const propIn = (key, defaultValue) => obj => lodashGet(obj, key, defaultValue);

export const immutableGet = key => obj => obj.get(key);
export const immutableGetIn = path => obj => obj.getIn(path);
export const immutableCompareProps = (a, b, key) => a.get(key) === b.get(key);

export const maybeValueReturn = (modifier = v => v) => ({value}) => modifier(value);
export const maybeValueGet = key => ({value}) => value.get(key);
export const maybeValueGetIn = path => ({value}) => value.getIn(path);

export const asyncDataReturn = (modifier = v => v) => ({data}) => modifier(data);
export const asyncDataGet = (key, modifier = identity) => ({data}) => modifier(data.get(key));
export const asyncDataGetIn = path => ({data}) => data.getIn(path);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (..._) => {};
export const constant = val => () => val;
export const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const removeNullProperties = obj => Object.keys(obj)
  .reduce((acc, key) => (obj[key] === null ? acc : {...acc, [key]: obj[key]}), {});

export const removeUndefinedProperties = obj => Object.keys(obj)
  .reduce((acc, key) => (obj[key] === undefined ? acc : {...acc, [key]: obj[key]}), {});

export const isFunction = func => typeof func === 'function';
export const not = val => !val;
export const negate = val => -1 * +val;
export const last = arr => arr[arr.length - 1];
export const head = arr => arr[0];
// eslint-disable-next-line no-shadow
export const ignoreProp = prop => obj => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {[prop]: _, ...rest} = obj;

  return rest;
};

export const ignoreProps = (props = []) => obj => props
  .reduce((acc, curr) => ignoreProp(curr)(acc), obj);

export const removeLastItem = arr => {
  const copy = [...arr];
  copy.pop();
  return copy;
};

export const ignoreAtIndex = (array, ignoreIndex) => array
  .reduce((acc, curr, i) => (i === ignoreIndex ? acc : [...acc, curr]), []);

export const toJS = immutable => immutable.toJS();

export const equals = a => b => a === b;
