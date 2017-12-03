/* eslint no-param-reassign: ["error", { "props": false }] */

const setToken = (state, token) => {
  state.token = token;
};

const setWeightList = (state, weightList) => {
  state.weightList = weightList;
};

export default { setToken, setWeightList };
