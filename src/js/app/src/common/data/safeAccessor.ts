/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

// ImmutableDataStructure is an immutablejs data structure i.e. Map, List etc
export const createSafeAccessors = defaultVal => ImmutableDataStructure => {
  ImmutableDataStructure.prototype.safeGet = function (path) {
    return this.get(path, defaultVal);
  };

  ImmutableDataStructure.prototype.safeGetIn = function (path) {
    return this.getIn(path, defaultVal);
  };

  return ImmutableDataStructure;
};

