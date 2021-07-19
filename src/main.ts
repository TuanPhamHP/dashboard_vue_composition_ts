import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/compositionApi";
import "./assets/style/_variables.scss";
import "./utils/directives/index";
Vue.config.productionTip = false;
new Vue({
 router,
 store,
 vuetify,
 render: h => h(App),
}).$mount("#app");
