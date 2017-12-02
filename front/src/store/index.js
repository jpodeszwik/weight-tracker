import Vue from 'vue';
import Vuex from 'vuex';
import isAuthenticated from './getters';
import setToken from './mutations';

Vue.use(Vuex);

const state = {
  token: null,
};

export default new Vuex.Store({
  getters: {
    isAuthenticated,
  },
  mutations: {
    setToken,
  },
  state,
});
