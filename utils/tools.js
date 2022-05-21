import * as _ from 'lodash';

export const pick = (names) => (obj) => {
  names = [].concat(names);
  return _.pick(obj, names);
};

export const omit = (names) => (obj) => {
  names = [].concat(names);
  return _.omit(obj, names);
};

export const funcReducer = ({ funcs, state }) => {
  funcs = Array.isArray(funcs) ? funcs : [funcs];
  return funcs.reduce(async (prev, next) => {
    state = await prev;
    next = next(state) ?? Promise.resolve(state);
    return next;
  }, Promise.resolve(state));
};
