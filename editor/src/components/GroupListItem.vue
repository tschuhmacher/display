<template>
  <div>
    <v-text-field
      label="3D Point"
      v-model="content.point"
      hint="Name of point have to be same in both languages !!!"
    ></v-text-field>
    <v-text-field label="Title" v-model="content.title"></v-text-field>
    <v-textarea name="input-7-1" label="First content" v-model="content.firstContent"></v-textarea>
    <v-text-field label="Image subtitle" v-model="content.imageSubtitle"></v-text-field>
    <v-layout>
      <v-text-field disabled v-model="content.image"></v-text-field>
      <v-btn class="upload_btn" small raised color="info" @click="onPickImage">Import Image</v-btn>
      <input type="file" class="hiden_input" ref="image" @change="onImagePicked">
    </v-layout>
    <v-textarea name="input-7-1" label="Second content" v-model="content.secondContent"></v-textarea>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <v-btn
          v-if="index + 1 === group.groupContent.length"
          icon
          slot="activator"
          @click="addNewInfoPoint"
        >
          <v-icon>note_add</v-icon>
        </v-btn>
        <span>Add infopoint</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn icon slot="activator" @click="removeInfoPoint(index)">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Delete infopoint</span>
      </v-tooltip>
    </v-card-actions>
    <v-divider class="divider" light></v-divider>
  </div>
</template>

<script>
export default {
  name: "GroupListItem",
  props: {
    content: Object,
    group: Object,
    uploadFile: Function,
    addNewInfoPoint: Function,
    removeInfoPoint: Function,
    setUpImageForInfoPoint: Function,
    index: Number
  },
  methods: {
    onPickImage: function() {
      this.$refs.image.click();
    },
    onImagePicked: function(event) {
      const file = event.target.files[0];
      this.setUpImageForInfoPoint(file, this.index);
    }
  }
};
</script>

<style scoped lang="scss">
.upload_btn {
  margin-top: 20px;
}
.hiden_input {
  display: none;
}
.divider {
  border-width: thin;
  border-color: #000 !important;
  margin-bottom: 25px;
}
</style>


