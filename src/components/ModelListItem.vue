<template>
  <router-link :to="`/model/${id}`">
    <li v-bind:class="[withImage ? 'list-item--with-image' : 'list-item']">
      <img
        v-if="withImage"
        class="list-item__image"
        v-bind:class="[isEven ? 'list-item__image--left' : 'list-item__image--right']"
        :src="coverImage"
      >
      <h2>{{title.toUpperCase()}}</h2>
      <p>{{location}}</p>
      <div v-if="withImage" class="divider">
        <div class="divider__inner"/>
      </div>
    </li>
  </router-link>
</template>

<script>
export default {
  name: "ModelListItem",
  props: {
    title: String,
    location: String,
    id: Number,
    image: String,
    withImage: Boolean,
    coverImage: String
  },
  data() {
    const isEven = this.id % 2 == 0;
    return {
      isEven
    };
  }
};
</script>

<style scoped lang="scss">
/* list item default */
.list-item {
  border-bottom: 1px solid #fff;
  padding-top: 10px;
  position: relative;
}

/* list item with image prop (list on home page) */
.list-item--with-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 1.7em;
  }
  p {
    font-size: 1.3em;
  }
  @media (max-width: 768px) {
    height: 200px;
  }
  @media (min-width: 768px) {
    margin: 2em;
    max-width: 160pt;
    text-align: center;
    word-break: break-word;
    justify-content: initial;
  }
}

/* list item image */
.list-item__image {
  position: absolute;
  height: 100%;
  background: transparent;

  @media (min-width: 768px) {
    /* reset absolute position on desktop to wrap the item correctly in the flexbox */
    height: auto;
    width: 100%;
    position: initial;
  }
}
/* image position on left (if the list item index is even)*/
.list-item__image--left {
  left: 0;
  /* don't apply on desktop version */
  @media (min-width: 768px) {
    left: initial;
  }
}
/* image position on right */
.list-item__image--right {
  right: 0;
  /* don't apply on desktop version */
  @media (min-width: 768px) {
    right: initial;
  }
}

h2 {
  font-size: 1.3em;
  z-index: 10;
}
p {
  z-index: 10;
  margin-bottom: 0.5em;
}
.divider {
  width: 100%;
  z-index: 10;
}
.divider__inner {
  border-bottom: 1px solid #fff;
  margin-left: 15vw;
  margin-right: 15vw;
  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
