import axios from "axios";
import { LoginAuth } from "../api";

const state = {
  isLogin: false,
  token: localStorage.getItem("token") || "",
  Userinfo: []
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.isLogin
};

const actions = {
  setLogin(
    { dispatch, commit, state, rootState, getters, rootGetters },
    payload
  ) {
    let url = `${rootState.setting.apiUrl}/${LoginAuth.SignInApi}`;
    let data = payload;
    let config = {
      "Content-Type": "application/json"
    };
    axios
      .post(url, data, config)
      .then(response => {
        let message = response.data.message;
        let result = response.data.result;
        let token = result.token;

        if (result !== false) {
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;

          commit("setIsLogin", result);
        } else {
          alert(message);
        }
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem("token");
      });
  },
  logout({ dispatch, commit, state, rootState, getters, rootGetters }) {
    commit("setLogout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }
};

const mutations = {
  setIsLogin(state, payload) {
    (state.isLogin = true), (state.token = payload.token);
    state.Userinfo = payload.userData;
  },
  setLogout(state, payload) {
    state.isLogin = "";
    state.token = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
