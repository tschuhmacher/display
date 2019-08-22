<template>
  <div id="app" @click="installApp">
    <v-app v-if="loaded">
      <div id="nav">
        <router-link class="nav__item-home" to="/" exact>{{content.menu.home.toUpperCase()}}</router-link>
        <router-link class="nav__item-model" to="/model">
          <div>{{content.menu.objects.toUpperCase()}}</div>
        </router-link>
        <v-spacer style="width: 100%"></v-spacer>
        <div class="nav__dropdown">
          <v-select
            :items="navigationLanguageItems"
            v-model="selectedLanguageItem"
            @change="changeLanguage"
            item-text="language"
            prepend-icon="translate"
            return-object
            single-line
            dark
          ></v-select>
        </div>
      </div>
      <router-view class="content" :content="content"/>
    </v-app>
  </div>
</template>

<script>
import router from "./router";
import config2 from "../public/config2.json";
import config from "../public/config.json";

import axios from "axios";

window.addEventListener("DOMContentLoaded", function() {
  document.location.pathname === "/index.html" && router.push("/");
});

let deferredPrompt = null;
let pressCancel;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
});

export default {
  name: "App",
  data() {
    return {
      navigationLanguageItems: [
        {
          language: "English"
        },
        {
          language: "Deutsch"
        }
      ],
      loaded: false,
      selectedLanguageItem: { language: "English" },
      config: this.$store.getters.getConfig,
      config2: this.$store.getters.getConfig2,
      content:
        this.$store.getters.getLanguage === "English" ? config2[0] : config2[1]
    };
  },
  created() {
    const configUrl = `${process.env.VUE_APP_API_URL}config.json`;
    const config2Url = `${process.env.VUE_APP_API_URL}config2.json`;
    const env = process.env.NODE_ENV;
    if (env == "development") {
      this.$store.dispatch("setConfig", config);
      this.$store.dispatch("setConfig2", config2);
      this.config = this.$store.getters.getConfig;
      this.config2 = this.$store.getters.getConfig2;
      this.loaded = true;
    } else {
      axios.all([axios.get(configUrl), axios.get(config2Url)]).then(
        axios.spread((remoteConfig, remoteConfig2) => {
          this.$store.dispatch("setConfig", remoteConfig.data);
          this.$store.dispatch("setConfig2", remoteConfig2.data);
          this.config = this.$store.getters.getConfig;
          this.config2 = this.$store.getters.getConfig2;
          this.content =
            this.$store.getters.getLanguage === "English"
              ? this.config2[0]
              : this.config2[1];

          this.loaded = true;
        })
      );
    }
  },
  computed: {
    isModelRoute() {
      const name = this.$route.name;
      if (name === "model") {
        return true;
      }
      return false;
    },
    translation() {
      return this.$store.getters.getLanguage;
    }
  },
  watch: {
    translation() {
      this.content =
        this.$store.getters.getLanguage === "English"
          ? this.config2[0]
          : this.config2[1];
    }
  },
  methods: {
    installApp: function() {
      if (deferredPrompt !== null && pressCancel !== null) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            //console.log("User accepted the A2HS prompt");
          } else {
            pressCancel = null;
          }
          deferredPrompt = null;
        });
      }
    },
    changeLanguage(selectedLanguageItem) {
      this.$store.dispatch("setLanguage", selectedLanguageItem.language);
    }
  }
};
</script>


<style lang="scss">
/* GLOBAL CSS */

/* style normalization */
* {
  margin: 0;
  border: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
ol,
li {
  list-style: none;
  padding-left: 0;
}

a {
  text-decoration: none;
}

html {
  background-color: black;
}
body {
  margin: 0;
  min-height: 100vh;
  position: relative;
  width: 100%;
}

/* main app styling */
#app {
  font-family: "Roboto Condensed", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // default global color and bg
  color: #2c3e50;
  background: #252525;
}

/* navigation */
#nav {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40pt;
  font-size: 0.9em;
  top: 0;
  padding-left: 5vw;
  padding-right: 5vw;
  background: #1900c6;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  line-height: 14px;
  z-index: 100;
  // item style

  a {
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    margin-right: 30pt;
    font-weight: bold;
    /* Home item */
    &.nav__item-home {
      white-space: pre-line; /*creates a line-break wherever a line-break appears in the code to achieve a new line after every word */
      font-weight: 100;
      letter-spacing: 0.05em;
    }
    /* menu active item styling */
    &.router-link-active,
    &.router-link-exact-active {
      border-bottom: 2px solid #fff;
      /* separate styling for the active "objects" item */
      &.nav__item-model {
        border: none;
        > div {
          padding: 2px 4px;
          border-radius: 4px;
          background-color: #fff;
          color: #1900c6;
        }
      }
    }
  }
}

.nav__dropdown .v-select {
  font-size: 0.9em;
}
/* container of the app's content with menu height offset */
.content {
  flex: 1;
  padding-top: 52px;
  overflow: hidden;
}

/* wrapper for content pages */
.content__page {
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  margin-bottom: 2em;
  color: #fff;
}

/* main content (needs to be set for the sticky footer on bottom) */
.content__page-main {
  flex: 1;
}

/* layout style to wrapp the content with side padding, appears in many instances */
.custom-layout {
  padding-left: 15vw;
  padding-right: 15vw;
}

/* model viewer's loader style with animation */
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.loading::before {
  content: "";
  border-radius: 100%;
  margin: 2px;
  border: 3px solid #20a0ff;
  border-bottom-color: transparent;
  height: 36px;
  width: 36px;
  display: inline-block;
  animation: loading-rotate 0.75s 0s linear infinite;
  vertical-align: middle;
}

.loading::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.6);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
</style>
