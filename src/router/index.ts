import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Table from "../views/Table.vue";
import AgencyList from "../views/agency/List.vue";
import Detail from "../views/agency/Detail.vue";
import auth from "../middleware/auth";
import api from "@/services";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
 {
  path: "/login",
  name: "login",
  component: Login,
 },
 {
  path: "/",
  name: "index",
  component: Home,
 },
 {
  path: "/table",
  name: "table",
  component: Table,
 },
 {
  path: "/about",
  name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
 },
 {
  path: "/order",
  name: "Order",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/order/Order.vue"),
 },
 {
  path: "/bag/list",
  name: "Bag",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/bag/Bag.vue"),
 },
 {
  path: "/bag/:id",
  name: "Bag Detail",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/bag/Detail.vue"),
 },

 {
  path: "/sender",
  name: "Sender",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/sender/Sender.vue"),
 },
 {
  path: "/consignee",
  name: "Consignee",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/consignee/Consignee.vue"),
 },
 {
  path: "/manifest",
  name: "Manifest",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/Manifest.vue"),
 },
 {
  path: "/manifest/:id",
  name: "Manifest Detail",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ "../views/ManifestDetail.vue"),
 },
 {
  path: "/agency",
  name: "Agency",
  component: AgencyList,
 },
];

const router = new VueRouter({
 mode: "history",
 routes,
});
router.beforeEach(async (to, from, next) => {
 if (to.path.includes("/login")) {
  if (auth()) {
   const userAuth = store.state.auth;
   if (userAuth.isAuth && userAuth.user) {
    next();
    return;
   }
   const res = await api.user.getUserInfo();
   if (!res) {
    localStorage.removeItem("auth._token.local");
    next({
     path: "/login",
     query: { redirect: to.fullPath },
    });
   }
   try {
    if (res.status > 399) {
     localStorage.removeItem("auth._token.local");
     next({
      path: "/login",
      query: { redirect: to.fullPath },
     });
     return;
    }
    if (res.response && !res.response.data.success) {
     localStorage.removeItem("auth._token.local");
     next({
      path: "/login",
      query: { redirect: to.fullPath },
     });
     return;
    }
    const localToken = localStorage.getItem("auth._token.local");
    const auth_set = {
     isAuth: true,
     user: res.data.data,
     token: `Bearer ${localToken}`,
    };
    store.commit("SET_USER_LOGGEDIN", auth_set);
    const nextStep = to.query && to.query.redirect ? to.query.redirect : "/";
    next({
     path: String(nextStep),
    });
   } catch (error) {
    console.log(error);
    next({
     path: "/login",
     query: { redirect: to.fullPath },
    });
   }
  } else {
   next();
  }
  return;
 } else {
  if (auth()) {
   const userAuth = store.state.auth;
   if (userAuth.isAuth && userAuth.user) {
    next();
    return;
   }
   const res = await api.user.getUserInfo();
   if (!res) {
    localStorage.removeItem("auth._token.local");
    next({
     path: "/login",
     query: { redirect: to.fullPath },
    });
   }
   try {
    if (res.status > 399) {
     localStorage.removeItem("auth._token.local");
     next({
      path: "/login",
      query: { redirect: to.fullPath },
     });
     return;
    }
    if (res.response && !res.response.data.success) {
     localStorage.removeItem("auth._token.local");
     next({
      path: "/login",
      query: { redirect: to.fullPath },
     });
     return;
    }
    const localToken = localStorage.getItem("auth._token.local");
    const auth_set = {
     isAuth: true,
     user: res.data.data,
     token: `Bearer ${localToken}`,
    };
    store.commit("SET_USER_LOGGEDIN", auth_set);
    // const nextStep = to.query && to.query.redirect ? to.query.redirect : "/";
    const nextStep = to.fullPath;
    next({
     path: String(nextStep),
    });
   } catch (error) {
    console.log(error);
    next({
     path: "/login",
     query: { redirect: to.fullPath },
    });
   }
  } else {
   localStorage.removeItem("auth._token.local");
   next({
    path: "/login",
    query: { redirect: to.fullPath },
   });
  }
 }
});
export default router;
