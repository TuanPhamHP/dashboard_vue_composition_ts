import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Table from "../views/Table.vue";
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
];

const router = new VueRouter({
 mode: "history",
 routes,
});
router.beforeEach(async (to, from, next) => {
 if (to.path.includes("/login")) {
  console.log(to);
  next();
  return;
 } else {
  if (auth()) {
   //  const localToken = localStorage.getItem("local_token");
   //  const res = await api.user.getUserInfo();
   //  if (!res) {
   //   localStorage.removeItem("local_token");
   //   next({
   //    path: "/login",
   //    query: { redirect: to.fullPath },
   //   });
   //  }
   //  try {
   //   next();
   //  } catch (error) {
   //   console.log(error);
   //   next({
   //    path: "/login",
   //    query: { redirect: to.fullPath },
   //   });
   //  }
   next();
  } else {
   next({
    path: "/login",
    query: { redirect: to.fullPath },
   });
  }
 }
});
export default router;
