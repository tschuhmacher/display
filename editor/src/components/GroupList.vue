<template>
  <div>
    <group-list-item
      v-for="(content, index) in group.groupContent"
      :key="index"
      v-bind:content="content"
      v-bind:group="group"
      v-bind:addNewInfoPoint="addNewInfoPoint"
      v-bind:removeInfoPoint="removeInfoPoint"
      v-bind:setUpImageForInfoPoint="setUpImageForInfoPoint"
      v-bind:index="index"
    />
  </div>
</template>

<script>
import GroupListItem from "@/components/GroupListItem.vue";

export default {
  name: "GroupList",
  props: {
    group: Object,
    infoPoints: Array,
    uploadFile: Function,
    removeGroup: Function,
    index: Number,
    indexOfInfopoint: Number
  },
  data() {
    return {
      config: this.$store.getters.getConfig
    };
  },
  methods: {
    addNewInfoPoint: function() {
      this.config[0][this.index].infoPoints[
        this.indexOfInfopoint
      ].groupContent.push({
        id: 0,
        point: "",
        title: "",
        firstContent: "",
        image: "",
        imageSubtitle: "",
        secondContent: ""
      });
      this.config[1][this.index].infoPoints[
        this.indexOfInfopoint
      ].groupContent.push({
        id: 0,
        point: "",
        title: "",
        firstContent: "",
        image: "",
        imageSubtitle: "",
        secondContent: ""
      });
    },
    removeInfoPoint: function(infoPointToRemove) {
      this.config[0][this.index].infoPoints[
        this.indexOfInfopoint
      ].groupContent.splice(infoPointToRemove, 1);
      this.config[1][this.index].infoPoints[
        this.indexOfInfopoint
      ].groupContent.splice(infoPointToRemove, 1);

      if (
        this.config[0][this.index].infoPoints[this.indexOfInfopoint]
          .groupContent.length === 0
      ) {
        this.removeGroup(this.indexOfInfopoint);
      }
    },
    setUpImageForInfoPoint: function(file, indexOfContent) {
      this.config[0][this.index].infoPoints[this.indexOfInfopoint].groupContent[
        indexOfContent
      ].image = `${process.env.BASE_URL}img/${file.name}`;
      this.config[1][this.index].infoPoints[this.indexOfInfopoint].groupContent[
        indexOfContent
      ].image = `${process.env.BASE_URL}img/${file.name}`;
      this.uploadFile(file);
    }
  },
  components: {
    GroupListItem
  }
};
</script>
