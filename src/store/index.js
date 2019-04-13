import Vue from "vue";
import Vuex from "vuex";

// Modules
import toolbar from './modules/toolbar'
import userAuthentication from './modules/userAuthentication'
import setting from './modules/setting'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    toolbar,
    userAuthentication,
    setting
  }
});
