import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  token: null,
  weightList: [],
};

export default new Vuex.Store({
  getters,
  mutations,
  state,
});
