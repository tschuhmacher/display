import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Exhibition from "./views/Exhibition.vue";
import Impressum from "./views/Impressum.vue";
import Home from "./views/Home.vue";
import ModelList from "./views/ModelList.vue";

Vue.use(Router);
const baseUrl = process.env.BASE_URL;

export default new Router({
  mode: "history",
  base: `${baseUrl}`,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/model",
      name: "modelList",
      component: ModelList
    },
    {
      path: "/model/:id",
      name: "model",
      // name: "model",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Model.vue")
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/exhibition",
      name: "exhibition",
      component: Exhibition
    },
    {
      path: "/impressum",
      name: "impressum",
      component: Impressum
    }
  ]
});
