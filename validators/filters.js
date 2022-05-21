const { omit } = require('../utils/tools');

module.exports = {
  filterBody: (protectedFields) => (state) => {
    state.body = omit(protectedFields)(state.body);
    return state;
  },
};
