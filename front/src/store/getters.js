const isAuthenticated = state => state.token !== null;

const getWeightList = state => state.weightList;

export default { getWeightList, isAuthenticated };
