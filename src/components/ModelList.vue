<template>
  <ol v-bind:class="{ listWithImage: withImage }">
    <model-list-item :withImage="withImage" :key="model.id" v-for="model in models" v-bind="model"/>
  </ol>
</template>

<script>
// @ is an alias to /src
import ModelListItem from "@/components/ModelListItem.vue";

export default {
  name: "ModelList",
  props: {
    withImage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const config = this.$store.getters.getConfig;
    return {
      config,
      models: []
    };
  },
  mounted() {
    const config = this.$store.getters.getConfig;
    this.models =
      this.$store.getters.getLanguage === "English" ? config[0] : config[1];
  },
  computed: {
    translation() {
      return this.$store.getters.getLanguage;
    }
  },
  watch: {
    translation() {
      this.models =
        this.$store.getters.getLanguage === "English"
          ? this.config[0]
          : this.config[1];
    }
  },
  components: {
    ModelListItem
  }
};
</script>

<style scoped lang="scss">
ul,
ol {
  list-style-type: none;
  padding: 0;
  margin-top: 3vw;
}
/* class for the list with images (e.g. home view) */
.listWithImage {
  /* wrap items on desktop */
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}
a {
  color: #fff;
}
</style>
