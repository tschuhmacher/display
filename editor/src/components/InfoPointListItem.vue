<template>
  <v-card>
    <v-subheader
      v-if="infoPoint.groupContent.length > 0"
      class="group_header"
    >{{`${indexOfInfopoint+1}. ${infoPoint.groupName}`}}</v-subheader>
    <v-container>
      <v-text-field
        v-if="infoPoint.groupContent.length > 0"
        label="Group name"
        v-model="infoPoint.groupName"
      ></v-text-field>
    </v-container>
    <v-container>
      <group-list
        v-bind:group="infoPoint"
        v-bind:infoPoints="infoPoints"
        v-bind:uploadFile="uploadFile"
        v-bind:removeGroup="removeGroup"
        v-bind:index="index"
        v-bind:indexOfInfopoint="indexOfInfopoint"
      ></group-list>
    </v-container>
  </v-card>
</template>

<script>
import GroupList from "@/components/GroupList.vue";

export default {
  name: "InfoPointListItem",
  props: {
    infoPoint: Object,
    infoPoints: Array,
    uploadFile: Function,
    removeGroup: Function,
    index: Number,
    indexOfInfopoint: Number
  },
  components: {
    GroupList
  }
};
</script>

<style scoped lang="scss">
.group_header {
  font-size: 1.1em;
  color: #4caf50 !important;
}
</style>
