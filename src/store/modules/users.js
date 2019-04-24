import axios from "axios";

const state = {};

const getters = {};

const actions = {
    getData({ dispatch, commit, state, rootState, getters, rootGetters }, payload) {
        let url = `${rootState.setting.apiUrl}/api/user/list`;
        console.log(rootState.setting)
        return new Promise((resolve, reject) => {
            try {
                axios
                    .get(url, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
                    .then(results => {
                        resolve(results)
                    });
            } catch (err) {
                reject(err)
            }
        })
    }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
