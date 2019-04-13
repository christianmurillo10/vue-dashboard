import Vue from "vue";
import Router from "vue-router";
import ErrorPage from '../views/Error'
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/",
      name: "others",
      component: Dashboard
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: '*',
      name: 'error',
      component: ErrorPage
    }
  ]
})

export default router
