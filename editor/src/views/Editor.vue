<template>
  <div v-if="!loading">
    <v-app id="inspire">
      <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
        <v-list dense>
          <template v-for="(item, index) in navigationActionItems">
            <v-layout v-if="item.heading" :key="item.heading" row align-center>
              <v-flex xs6>
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-flex>
            </v-layout>
            <v-list-tile v-bind:key="index" v-else @click="item.action">
              <v-list-tile-action>
                <v-icon right>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-tooltip right>
                    <span slot="activator">{{item.text}}</span>
                    <span>{{item.tooltip}}</span>
                  </v-tooltip>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <input type="file" class="hiden_input" ref="fileInput" @change="onNewSettingsPicked">
          <a id="downloadCurrentSettings" class="hiden_input"></a>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">JSON Editor</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-select
          :items="navigationLanguageItems"
          v-model="selectedLanguageItem"
          @change="changeLanguage"
          item-text="language"
          label="Select the language"
          prepend-icon="language"
          persistent-hint
          return-object
          single-line
          color="success"
        ></v-select>
      </v-toolbar>
      <v-content>
        <v-alert
          :value="alert.show"
          :type="alert.type"
          @click="alert.show = !alert.show"
          transition="scale-transition"
          class="alert"
        >{{alert.text}}</v-alert>
        <v-container fluid>
          <v-layout justify-center align-center>
            <object-list v-bind:objects="objects"></object-list>
          </v-layout>
        </v-container>
      </v-content>
      <v-tooltip left>
        <v-btn
          fab
          bottom
          right
          color="#3BA2F4"
          dark
          fixed
          slot="activator"
          v-on:click="addNewObject"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <span>Add object</span>
      </v-tooltip>
    </v-app>
  </div>
</template>

<script>
import ObjectList from "../components/ObjectList.vue";
import config from "../../../public/config.json";
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      dialog: false,
      drawer: null,
      navigationActionItems: [
        {
          icon: "cloud_upload",
          text: "Import",
          tooltip: "Select json file to overwrite currently loaded settings",
          action: this.onPickNewSettings
        },
        {
          icon: "cloud_download",
          text: "Export",
          tooltip: "Download currently loaded settings",
          action: this.exportCurrentSettings
        },
        {
          icon: "save",
          text: "Save",
          tooltip: "Save currently loaded settings into config file",
          action: this.isContentSameForBothLanguages
        }
      ],
      navigationLanguageItems: [
        {
          language: "English"
        },
        {
          language: "German"
        }
      ],
      selectedLanguageItem: { language: "English" },
      alert: {
        show: false,
        type: "info",
        text: "Default text"
      },
      objects: [],
      config: this.$store.getters.getConfig
    };
  },
  mounted: function() {
    const configUrl = `${process.env.VUE_APP_API_URL}config.json`;

    if (process.env.NODE_ENV === "development") {
      this.$store.dispatch("setConfig", config);
      this.config = this.$store.getters.getConfig;
      this.objects =
        this.selectedLanguageItem.language === "English"
          ? this.config[0]
          : this.config[1];
      this.loading = false;
    } else {
      axios
        .get(configUrl)
        .then(response => {
          this.$store.dispatch("setConfig", response.data);
          this.config = this.$store.getters.getConfig;

          this.objects =
            this.selectedLanguageItem.language === "English"
              ? this.config[0]
              : this.config[1];
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  updated: function() {
    setTimeout(() => {
      if (this.alert.show) {
        this.alert.show = false;
      }
    }, 5000);
  },
  methods: {
    addNewObject: function() {
      this.config[0].push({
        id: this.config[0].length,
        title: `Object ${this.config[0].length + 1}`,
        scene: "",
        coverImage: "",
        location: "",
        infoPoints: []
      });
      this.config[1].push({
        id: this.config[1].length,
        title: `Objekt ${this.config[1].length + 1}`,
        scene: "",
        coverImage: "",
        location: "",
        infoPoints: []
      });
    },
    onPickNewSettings: function() {
      this.$refs.fileInput.click();
    },
    onNewSettingsPicked: function(event) {
      const input = event.target;
      const reader = new FileReader();

      reader.readAsText(input.files[0]);

      reader.onloadend = () => {
        this.config[0] = JSON.parse(reader.result)[0];
        this.config[1] = JSON.parse(reader.result)[1];
        this.objects =
          this.selectedLanguageItem.language === "English"
            ? this.config[0]
            : this.config[1];
        this.alert = {
          show: true,
          type: "success",
          text: "New setting was successfully loaded"
        };
      };
    },
    exportCurrentSettings: function() {
      const currentSettings =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(this.config));
      const downloadElement = document.getElementById(
        "downloadCurrentSettings"
      );

      downloadElement.setAttribute("href", currentSettings);
      downloadElement.setAttribute("download", "config.json");
      downloadElement.click();
      this.alert = {
        show: true,
        type: "success",
        text: "Setting was successfully exported"
      };
    },
    saveNewConfigFile: function(configContent, configName) {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/save"
          : `${process.env.VUE_APP_API_URL}createConfig.php`;

      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ content: configContent, name: configName })
      })
        .then(() => {
          this.alert = {
            show: true,
            type: "success",
            text: "It was successfully saved"
          };
        })
        .catch(() => {
          this.alert = {
            show: true,
            type: "error",
            text: "Ooops something went wrong"
          };
        });
    },
    changeLanguage: function(selectedLanguageItem) {
      this.objects =
        selectedLanguageItem.language === "English"
          ? this.config[0]
          : this.config[1];
    },
    isContentSameForBothLanguages: function() {
      this.saveNewConfigFile(this.config, "config.json");
    }
  },
  components: {
    ObjectList
  }
};
</script>

<style scoped lang="scss">
.hiden_input {
  display: none;
}
.alert {
  position: fixed;
  z-index: 999;
  width: 100%;
  margin-top: -60px;
  text-align: left;
}
</style>
