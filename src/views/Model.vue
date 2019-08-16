<template>
  <div class="model-viewer">
    <div class="model-viewer__info">
      <h3>{{model.title}}</h3>
      <p>
        <v-icon small dark>location_on</v-icon>
        {{model.location}}
      </p>
    </div>

    <model-gltf
      ref="modelViewer"
      @on-click="onClick"
      @on-load="onLoad"
      @on-progress="onProgress"
      :src="model.scene"
      :backgroundAlpha="0"
      :lights="[
					{
							type: 'DirectionalLight',
							position: { x: 1, y: 1, z: 1 },
							color: 0xffffff,
							intensity: 1
					}
				]"
    ></model-gltf>

    <div class="loading" v-show="loading">{{progress}} %</div>

    <Slider
      :width="window.width"
      :infoPoints="infoPoints"
      ref="sliderRef"
      v-bind:class="{ sliderHidden: !sliderVisible }"
      @on-slide-change="onSlideChange"
      @on-close="close"
    />

    <div class="model-viewer__buttons">
      <v-btn v-if="!sliderVisible" @click="togglePoints()" fab dark color="white">
        <v-icon color="black">{{pointsVisible ? "visibility_off" : "visibility"}}</v-icon>
      </v-btn>
      <v-btn v-if="!sliderVisible" @click="resetCamera()" fab dark color="white">
        <img class="icn-exit" :src="`${publicPath}img/exit.png`">
      </v-btn>
      <v-btn v-if="sliderVisible" @click="close()" fab dark color="white">
        <v-icon color="black">close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ModelGltf from "@/components/model-viewer/model-gltf.vue";
import Slider from "@/components/Slider.vue";

export default {
  data() {
    const config = this.$store.getters.getConfig;
    const languageVersion =
      this.$store.getters.getLanguage === "English" ? config[0] : config[1];
    const model = languageVersion.find(
      item => item.id == this.$route.params.id
    );
    const infoPoints = model.infoPoints;

    return {
    publicPath: process.env.BASE_URL,

      config,
      languageVersion,
      model,
      infoPoints,
      progress: 0,
      loading: true,
      intersected: null,
      sceneRef: null,
      sliderVisible: false,
      pointsVisible: true,
      window: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.window.height = window.innerHeight;
        this.window.width = window.innerWidth;
      });
    });
  },
  computed: {
    translation() {
      return this.$store.getters.getLanguage;
    },
    modelViewer() {
      return this.$refs.modelViewer;
    },
    infoSlider() {
      return this.$refs.sliderRef;
    }
  },
  watch: {
    translation() {
      this.languageVersion =
        this.$store.getters.getLanguage === "English"
          ? this.config[0]
          : this.config[1];
      this.model = this.languageVersion.find(
        item => item.id == this.$route.params.id
      );
      this.infoPoints = this.model.infoPoints;
    }
  },
  methods: {
    onClick(event) {
      if (this.intersected) {
        this.intersected.material.opacity = 1;
      }

      if (!event) {
        this.intersected = null;
        this.sliderVisible = false;
        return;
      }
      if (event) {
        const type = event.object.type;
        if (type == "Sprite") {
          this.intersected = event.object;
          this.intersected.material.opacity = 0.2;
          const name = this.intersected.name;

          this.modelViewer.selectPoint(this.intersected.position);
          this.infoSlider.changeSlide(name);

          this.sliderVisible = true;
        } else {
          this.sliderVisible = false;
        }
      }
    },
    onLoad(el) {
      this.sceneRef = el;
      this.loading = false;
    },
    onProgress(val) {
      const percentage = (val.loaded / val.total) * 100;
      this.progress = percentage.toFixed(2);
    },
    onSlideChange(val) {
      if (this.intersected) {
        this.intersected.material.opacity = 1;
      }
      if (!val) {
        return;
      }
      const sprite = this.sceneRef.children.find(
        item => item.name == val.point
      );
      if (sprite) {
        this.intersected = sprite;
        this.intersected.material.opacity = 0.2;
        this.modelViewer.selectPoint(this.intersected.position);
      } else {
        console.log("Sprite is missing in the scene!");
      }
    },
    togglePoints() {
      this.pointsVisible = !this.pointsVisible;
      this.modelViewer.togglePointsVisibility(this.pointsVisible);
    },
    resetCamera() {
      this.modelViewer.resetCamera();
    },
    close() {
      if (this.intersected) {
        this.intersected.material.opacity = 1;
      }
      if (this.infoSlider.isExpanded) {
        if (this.window.width > 768) {
          this.sliderVisible = false;
        }
        return this.infoSlider.toggleExpand();
      }
      this.sliderVisible = false;
    }
  },
  components: {
    ModelGltf,
    Slider
  }
};
</script>

<style scoped lang="scss">
/* container for the model viewer */
.model-viewer {
  width: 100%;
  position: relative;
  max-height: 100vh;

  /* background - to be able to set up background for the viewer, the model-gltf needs to have the backgroundAlpha propery set to 0  */
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
}

/* visibility of the slider */
.sliderHidden {
  display: none;
}

/* upper part info for the title and location */
.model-viewer__info {
  position: fixed;
  display: flex;
  height: 45pt;
  width: 100%;
  padding: 0 3em;
  color: #fff;
  background-color: rgba($color: #000000, $alpha: 0.35);
  flex-direction: column;
  justify-content: center;
  z-index: 8;
  p {
    margin-bottom: 0px;
    :first-child {
      width: 10px;
      height: 20px;
    }
  }
  h3 {
    margin-bottom: 5px;
  }
}

/* bottom buttons, fixed property is necessary for mobile devices! */
.model-viewer__buttons {
  position: fixed;
  display: block;
  bottom: 0;
  right: 0;
  padding: 3vw;
  z-index: 10;
}
.button {
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  vertical-align: middle;
  padding: 30px;
}

/* fit svg icon size */
.icn-exit {
  width: 20px;
}
</style>
