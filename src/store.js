import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedLanguageItem: { language: "English" },
    config: [],
    config2: []
  },
  mutations: {
    changeLanguage(state, payload) {
      state.selectedLanguageItem.language = payload;
    },
    changeConfig(state, payload) {
      state.config = payload;
    },
    changeConfig2(state, payload) {
      state.config2 = payload;
    }
  },
  actions: {
    setLanguage({ commit }, payload) {
      commit("changeLanguage", payload);
    },
    setConfig({ commit }, payload) {
      commit("changeConfig", payload);
    },
    setConfig2({ commit }, payload) {
      commit("changeConfig2", payload);
    }
  },
  getters: {
    getLanguage(state) {
      return state.selectedLanguageItem.language;
    },
    getConfig(state) {
      return state.config;
    },
    getConfig2(state) {
      return state.config2;
    }
  }
});
