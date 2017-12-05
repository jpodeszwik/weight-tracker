/* eslint no-param-reassign: ["error", { "props": false }] */

const setAuthenticated = (state, authenticated) => {
  state.authenticated = authenticated;
};

const setWeightList = (state, weightList) => {
  state.weightList = weightList;
};

export default { setAuthenticated, setWeightList };
