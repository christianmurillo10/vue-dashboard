import axios from "axios";

const state = {};

const getters = {};

const actions = {
  getData(
    { dispatch, commit, state, rootState, getters, rootGetters },
    payload
  ) {
    let url = `${rootState.setting.apiUrl}/api/role/list`;
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  saveData(
    { dispatch, commit, state, rootState, getters, rootGetters },
    payload
  ) {
    let url = `${rootState.setting.apiUrl}/api/role/create`;
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          data: {
            name: payload.name,
            description: payload.description
          }
        };

        axios
          .post(url, obj, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  updateData(
    { dispatch, commit, state, rootState, getters, rootGetters },
    payload
  ) {
    let url = `${rootState.setting.apiUrl}/api/role/update`;
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          id: payload.id,
          data: {
            name: payload.name,
            description: payload.description
          }
        };

        axios
          .put(url, obj, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  deleteData(
    { dispatch, commit, state, rootState, getters, rootGetters },
    payload
  ) {
    let url = `${rootState.setting.apiUrl}/api/role/delete`;
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          id: payload.id
        };

        axios
          .put(url, obj, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            resolve(response);
          });
      } catch (err) {
        reject(err);
      }
    });
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
