<script>
import { GLTFLoader } from "./loaders/GLTFLoader";
import mixin from "./model-mixin.vue";

export default {
  name: "model-gltf",
  mixins: [mixin],
  props: {
    lights: {
      type: Array,
      default() {
        return [
          {
            type: "AmbientLight",
            color: 0xaaaaaa
          },
          {
            type: "DirectionalLight",
            position: { x: 1, y: 1, z: 1 },
            color: 0xffffff,
            intensity: 0.8
          }
        ];
      }
    }
  },
  data() {
    const loader = new GLTFLoader();
    loader.setCrossOrigin(this.crossOrigin);

    return {
      loader
    };
  }
};
</script>
