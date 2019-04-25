import axios from "axios";

const state = {};

const getters = {};

const actions = {
  getData(
    { dispatch, commit, state, rootState, getters, rootGetters },
    payload
  ) {
    let url = `${rootState.setting.apiUrl}/api/user/list`;
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
    let url = `${rootState.setting.apiUrl}/api/user/create`;
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          data: {
            email: payload.email,
            username: payload.username,
            password: payload.password,
            position_id: payload.position_id
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
    let url = `${rootState.setting.apiUrl}/api/user/update`;
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          id: payload.id,
          data: {
            username: payload.username,
            email: payload.email,
            position_id: payload.position_id
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
    let url = `${rootState.setting.apiUrl}/api/user/delete`;
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
