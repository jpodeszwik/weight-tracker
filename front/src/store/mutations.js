/* eslint no-param-reassign: ["error", { "props": false }] */

const setAuthenticated = (state, authenticated) => {
  state.authenticated = authenticated;
};

export default { setAuthenticated };
