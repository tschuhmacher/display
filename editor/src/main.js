import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import dotenv from 'dotenv'
import store from "./store";

Vue.use(Vuetify);

dotenv.config()

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
