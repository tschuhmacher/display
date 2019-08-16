<template>
  <div class="content__page">
    <div class="content__page-main custom-layout">
      <h1>{{content.menu.about}}</h1>
      <p>
        Icing chocolate dessert oat cake cupcake lollipop chocolate
        bar candy canes. Tart lemon drops jelly-o danish icing tart cake jelly-o chocolate.
        Dragée bonbon sweet roll sesame snaps oat cake gingerbread. Icing donut biscuit sugar plum biscuit jelly carrot cake sweet roll
      </p>
      <div v-html="content.about.content"/>
    </div>
    <Footer :content="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/Footer.vue";

export default {
  name: "about",
  props: {
    content: Object
  },
  components: { Footer }
};
</script>
