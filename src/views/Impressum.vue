<template>
  <div class="content__page">
    <div class="content__page-main custom-layout">
      <h1>{{content.menu.impressum}}</h1>
      <div v-html="content.impressum.content"/>
    </div>
    <Footer :content="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";

export default {
  name: "impressum",
  props: {
    content: Object
  },
  components: { Footer }
};
</script>
