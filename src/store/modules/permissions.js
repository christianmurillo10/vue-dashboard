import axios from "axios";

const state = {};

const getters = {};

const actions = {
  getData(
    { dispatch, commit, state, rootState, getters, rootGetters },
    payload
  ) {
    let url = `${rootState.setting.apiUrl}/api/permission/list`;
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
    let url = `${rootState.setting.apiUrl}/api/permission/create`;
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          data: {
            name: payload.name,
            description: payload.description,
            code: payload.code,
            route: payload.route,
            order: payload.order,
            parent_id: payload.parent_id,
            type: payload.type,
            is_parent: payload.is_parent
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
    let url = `${rootState.setting.apiUrl}/api/permission/update`;
    return new Promise((resolve, reject) => {
      try {
        let obj = {
          id: payload.id,
          data: {
            name: payload.name,
            description: payload.description,
            code: payload.code,
            route: payload.route,
            order: payload.order,
            parent_id: payload.parent_id,
            type: payload.type,
            is_parent: payload.is_parent
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
    let url = `${rootState.setting.apiUrl}/api/permission/delete`;
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
