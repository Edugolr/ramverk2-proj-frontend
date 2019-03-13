import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Market from "./views/Market.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
  hash: false,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/user/login",
      name: "login",
      component: Login
    },
    {
      path: "/user/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/market",
      name: "Market",
      component: Market
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
     { path: '*', redirect: '/' }, // catch all use case
  ]
});
