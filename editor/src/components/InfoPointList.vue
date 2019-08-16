<template>
  <div>
    <info-point-list-item
      v-for="(infoPoint, indexOfInfopoint) in infoPoints"
      :key="indexOfInfopoint"
      v-bind:infoPoint="infoPoint"
      v-bind:infoPoints="infoPoints"
      v-bind:uploadFile="uploadFile"
      v-bind:removeGroup="removeGroup"
      v-bind:index="index"
      v-bind:indexOfInfopoint="indexOfInfopoint"
    />
    <div class="add_info_point_icon" v-on:click="addNewGroup">
      <v-tooltip left>
        <v-btn icon slot="activator">
          <v-icon color="#4CAF50" large>note_add</v-icon>
        </v-btn>
        <span>Add group of infopoints</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import InfoPointListItem from "@/components/InfoPointListItem.vue";

export default {
  name: "InfoPointList",
  props: {
    index: Number,
    infoPoints: Array,
    uploadFile: Function
  },
  data () {
    return {
      config: this.$store.getters.getConfig
    }
  },
  methods: {
    addNewGroup: function() {
      this.config[0][this.index].infoPoints.push({
        groupName: "New group",
        groupContent: [
          {
            id: 0,
            point: "",
            title: "",
            firstContent: "",
            image: "",
            imageSubtitle: "",
            secondContent: ""
          }
        ]
      });
      this.config[1][this.index].infoPoints.push({
        groupName: "Neue grupe",
        groupContent: [
          {
            id: 0,
            point: "",
            title: "",
            firstContent: "",
            image: "",
            imageSubtitle: "",
            secondContent: ""
          }
        ]
      });
    },
    removeGroup: function(infoPointToRemove) {
      this.config[0][this.index].infoPoints.splice(infoPointToRemove, 1);
      this.config[1][this.index].infoPoints.splice(infoPointToRemove, 1);
    }
  },
  components: {
    InfoPointListItem
  }
};
</script>

<style scoped lang="scss">
.add_info_point_icon {
  text-align: right;
}
</style>
