<template>
  <div class="content__page">
    <div class="content__page-main custom-layout">
      <h1>{{content.menu.exhibition}}</h1>
      <div v-html="content.exhibition.content"/>
    </div>

    <Footer :content="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";

export default {
  name: "exhibition",
  props: {
    content: Object
  },
  components: { Footer }
};
</script>
