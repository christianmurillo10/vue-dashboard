const state = {
  apiUrl: null,
  dashboard: "dashboard"
};

const getters = {};

const actions = {};

const mutations = {
  setUrlData(state, payload) {
    state.apiUrl = payload.apiUrl;
  },
  setDashboardData(state, payload) {
    state.dashboard = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
