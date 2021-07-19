import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
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
 },
 actions: {},
 modules: {},
});
