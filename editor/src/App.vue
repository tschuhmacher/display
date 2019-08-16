<template>
    <div id="app">
      <Editor/>
    </div>
</template>

<script>
import Editor from "./views/Editor.vue";

export default {
  name: "app",
  components: {
    Editor
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
