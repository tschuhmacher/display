<template>
  <v-expansion-panel>
    <object-list-item
      v-for="(object, index) in objects"
      :key="index"
      v-bind:object="object"
      v-bind:removeObject="removeObject"
      v-bind:index="index"
    />
  </v-expansion-panel>
</template>

<script>
import ObjectListItem from "@/components/ObjectListItem.vue";

export default {
  name: "ObjectList",
  props: {
    objects: Array,
  },
  data () {
    return {
      config: this.$store.getters.getConfig
    }
  },
  methods: {
    removeObject: function(objectToRemove) {
      this.config[0].splice(objectToRemove, 1);
      this.config[1].splice(objectToRemove, 1);
    }
  },
  components: {
    ObjectListItem
  }
};
</script>

