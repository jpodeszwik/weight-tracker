import Vue from 'vue';
import Vuex from 'vuex';
import isAuthenticated from './getters';
import setAuthenticated from './mutations';

Vue.use(Vuex);

const state = {
  authenticated: false,
};

export default new Vuex.Store({
  getters: {
    isAuthenticated,
  },
  mutations: {
    setAuthenticated,
  },
  state,
});
