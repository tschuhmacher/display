import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { VueHammer } from "vue2-hammer";

Vue.use(Vuetify);
Vue.use(VueHammer);

VueHammer.config.swipe = {
  threshold: 200
};
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
