import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
  auth: {
   isAuth: false,
   user: null,
   token: null,
  },
  currentBreadcrumb: [
   {
    text: "Dashboard",
    disabled: false,
    href: "breadcrumbs_dashboard",
   },
   {
    text: "Link 1",
    disabled: false,
    href: "breadcrumbs_link_1",
   },
   {
    text: "Link 2",
    disabled: true,
    href: "breadcrumbs_link_2",
   },
  ],
  snackbar: {
   type: "", // success, error, warning
   title: "",
   content: "",
  },
  previousPagination: {
   total: 1,
   per_page: 15,
   total_pages: 15,
   current_page: 1,
  },
  logoutIsOpen: false,
  isMini: false,
  breadCrumb: {
   viewTxt: "GP Express",
   ableToBack: false,
   rootRouter: "/",
   hasStatus: false,
   statusTxt: "Status",
  },
 },
 mutations: {
  SET_SNACKBAR(state, payload) {
   state.snackbar = payload;
   setTimeout(() => {
    state.snackbar = {
     type: "",
     title: "",
     content: "",
    };
   }, 4000);
  },
  CACHED_PAGINATION(state, payload) {
   state.previousPagination = payload;
  },
  SET_USER_LOGGEDIN(state, payload) {
   state.auth = { ...payload };
  },
  SET_LOGOUT_USER(state) {
   state.auth = { isAuth: false, user: null, token: null };
  },
  CONFIRM_LOGOUT(state, payload) {
   state.logoutIsOpen = payload;
  },
  SET_MINI(state, payload) {
   state.isMini = payload;
  },
  SET_BREADCRUMB(state, payload) {
   state.breadCrumb = payload;
  },
 },
 actions: {},
 modules: {},
});
