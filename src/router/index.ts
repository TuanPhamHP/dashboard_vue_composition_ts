import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Table from "../views/Table.vue";

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

export default router;
