<template>
  <div class="home">
    <header class="custom-layout">
      <h1>{{content.title.toUpperCase()}}</h1>
      <p>{{content.content}}</p>
      <div class="home__more">
        <router-link to="/exhibition">{{content.more}}</router-link>
      </div>
    </header>
    <ModelList withImage/>
    <Footer :content="content"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ModelList from "@/components/ModelList.vue";
import Slider from "@/components/Slider.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  props: {
    content: Object
  },
  components: {
    ModelList,
    Slider,
    Footer
  }
};
</script>

<style scoped lang="scss">
/* container for the home page */
.home {
  height: 100%;
  padding-bottom: 2em;
  background: #45484d; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #45484d 0%,
    #000000 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #45484d 0%,
    #000000 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #45484d 0%,
    #000000 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 ); /* IE6-9 */

  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
header {
  color: #fff;
  h1 {
    line-height: 1.2em;
  }
  p {
    line-height: 1.4em;
    font-size: 1.2em;
    margin-bottom: 0;
  }
}
h1 {
  font-size: 3em;
  padding: 5vh 0 3vh 0;
  font-weight: lighter;
  display: table-caption;
  line-height: 1.2em;
}
.home__more {
  font-size: 1.2em;
  margin-top: 2em;
  margin-bottom: 2em;
  a {
    color: #fff;
    font-weight: bold;
    border-bottom: 1px solid #fff;
  }
}
.w-50 {
  width: 50%;
}

.home__bottom-menu {
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  a {
    font-weight: bold;
    font-size: 1.3em;
    line-height: 1.8em;
    color: #fff;
  }
}
footer {
  margin-top: 2em;
}
.home__logos {
  /* display: flex; */
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  > div {
    margin-top: 1em;
    @media (min-width: 768px) {
      margin-right: 1em;
    }
  }
}
</style>
