const setAuthenticated = (context, authenticated) => {
  context.commit('setAuthenticated', authenticated);
};

export default { setAuthenticated };
