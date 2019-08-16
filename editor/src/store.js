import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: []
    },
    mutations: {
        changeConfig(state, payload) {
            state.config = payload;
        }
    },
    actions: {
        setConfig({ commit }, payload) {
            commit("changeConfig", payload);
        }
    },
    getters: {
        getConfig(state) {
            return state.config;
        }
    }
});
