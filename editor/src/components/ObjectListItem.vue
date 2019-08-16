<template>
  <v-expansion-panel-content>
    <div slot="header">
      <v-subheader class="object_header">{{object.title}}</v-subheader>
    </div>
    <v-card>
      <v-container>
        <v-text-field v-model="object.title" label="Title"></v-text-field>
        <v-layout>
          <v-text-field disabled v-model="object.scene"></v-text-field>
          <v-btn class="upload_btn" small raised color="info" @click="onPickScene">Import Scene</v-btn>
          <input type="file" class="hiden_input" ref="sceneInput" @change="onScenePicked">
        </v-layout>
        <v-layout>
          <v-text-field disabled v-model="object.coverImage"></v-text-field>
          <v-btn class="upload_btn" small raised color="info" @click="onPickImage">Import Image</v-btn>
          <input type="file" class="hiden_input" ref="imageInput" @change="onImagePicked">
        </v-layout>
        <v-text-field v-model="object.location" label="Location"></v-text-field>
        <v-subheader v-if="object.infoPoints.length > 0" class="info_point_header">
          <span>{{object.infoPoints.length === 1 ? "Infopoint group:" : "Infopoint groups:"}}</span>
        </v-subheader>
        <info-point-list
          v-bind:index="index"
          v-bind:infoPoints="object.infoPoints"
          v-bind:uploadFile="uploadFile"
        ></info-point-list>
      </v-container>
      <v-card-actions>
        <v-tooltip right>
          <v-btn
            small
            fab
            dark
            slot="activator"
            color="#F5594E"
            class="remove_btn"
            @click="removeObject(index)"
          >
            <v-icon dark>remove</v-icon>
          </v-btn>
          <span>Remove object</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import InfoPointList from "@/components/InfoPointList.vue";

export default {
  name: "ObjectListItem",
  props: {
    object: Object,
    removeObject: Function,
    index: Number
  },
  data() {
    return {
      config: this.$store.getters.getConfig
    };
  },
  methods: {
    onPickScene: function() {
      this.$refs.sceneInput.click();
    },
    onPickImage: function() {
      this.$refs.imageInput.click();
    },
    onScenePicked: function(event) {
      const file = event.target.files[0];
      this.config[0][this.index].scene = `/models/${file.name}`;
      this.config[1][this.index].scene = `/models/${file.name}`;
      this.uploadFile(file);
    },
    onImagePicked: function(event) {
      const file = event.target.files[0];
      this.config[0][this.index].coverImage = `${process.env.BASE_URL}img/${file.name}`;
      this.config[1][this.index].coverImage = `${process.env.BASE_URL}img/${file.name}`;
      this.uploadFile(file);
    },
    uploadFile: function(file) {
      const fileForUpload = new FormData();
      fileForUpload.append("file", file);

      const apiUrl = process.env.NODE_ENV === "development" ? 'http://localhost:8000/upload' : `${process.env.VUE_APP_API_URL}uploadFile.php`

      fetch(apiUrl, {
        method: "POST",
        body: fileForUpload
      })
        .then()
        .catch();
    }
  },
  components: {
    InfoPointList
  }
};
</script>

<style scoped lang="scss">
.object_header {
  font-size: 1.2em;
  color: #3ba2f4 !important;
}
.upload_btn {
  margin-top: 20px;
}
.hiden_input {
  display: none;
}
.info_point_header {
  margin: 30px 0 0 0;
  font-size: 1.2em;
  color: #3ba2f4 !important;
}
.remove_btn {
  margin: 0px 0px 15px 30px !important;
}
</style>
