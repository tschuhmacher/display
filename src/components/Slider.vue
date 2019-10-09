<template>
  <v-layout
    v-touch="{
      left: () => swipe('swipeleft'),
      right: () => swipe('swiperight'),
    }"
  >
    <swiper ref="mySwiper" :options="swiperOption" v-bind:class="{ active: isExpanded }">
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <div class="card">
          <header>
            <v-btn @click="previous()" flat icon color="black">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <div class="mr-auto">{{groupName}}</div>
            <v-btn @click="next()" flat icon color="black">
              <v-icon>arrow_forward</v-icon>
            </v-btn>
          </header>
          <div class="card__content">
            <section>
              <h2 class="card__title">{{ slide.title }}</h2>
            </section>

            <div v-if="isExpanded" class="content-expanded">
              <p>{{slide.firstContent}}</p>
              <v-img :src="slide.image" aspect-ratio="1.3" class="grey lighten-2 card__image"/>
              <p>{{slide.imageSubtitle}}</p>
              <p>{{slide.secondContent}}</p>
              <div class="overflowSpacer"></div>
            </div>

            <div v-if="!isExpanded">
              <p>
                {{truncate(slide.firstContent)}}
                <a
                  class="blue--text darken-1 expander"
                  @click="toggleExpand()"
                >{{content.expand}}</a>
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </v-layout>
</template>


<script>
// require styles for the swiper
import "swiper/dist/css/swiper.css";

// @ is an alias to /src
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { truncateString } from "@/utils/strings.js";

export default {
  name: "carrousel",
  props: {
    infoPoints: Array,
    width: Number
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    const slides = [];
    const groupName = null;
    return {
      slides,
      config2: this.$store.getters.getConfig2,
      groupName,
      isExpanded: false,
      activeIndex: null,
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 0,
        // Responsive breakpoints
        breakpoints: {
          // when window width is <= 768px
          768: {
            coverflowEffect: {
              rotate: 0,
              stretch: 33,
              depth: 0,
              modifier: 1,
              slideShadows: false
            }
          }
        }
      }
    };
  },
  mounted() {
    this.config2 = this.$store.getters.getConfig2;
    if (this.width > 768) {
      this.isExpanded = true;
    }
    this.content =
      this.$store.getters.getLanguage === "English"
        ? this.config2[0]
        : this.config2[1];
    this.swiper.on("slideChange", this.onSlideChange);
    this.swiper.on("slideChangeTransitionEnd", this.slideChangeTransitionEnd);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    translation() {
      return this.$store.getters.getLanguage;
    }
  },
  watch: {
    infoPoints: {
      deep: true,
      handler(val) {
        this.infoPoints = val;
        if (this.pointName) {
          const group = this.findGroup();
          this.slides = group.groupContent;
          this.groupName = group.groupName;
        }
      }
    },
    translation() {
      this.content =
        this.$store.getters.getLanguage === "English"
          ? this.config2[0]
          : this.config2[1];
    },
    width: {
      handler(val) {
        if (val > 768) {
          this.isExpanded = true;
        }
      }
    }
  },
  methods: {
    swipe(event) {
      const end = this.slides.length - 1;

      switch (event) {
        case "swipedown":
          if (this.isExpanded) {
            return this.toggleExpand();
          }
          this.$emit("on-close");
          break;
        case "swipeup":
          this.toggleExpand();
          break;
        case "swipeleft":
          if (this.activeIndex === end) {
            this.swiper.slideTo(0, 500);
            this.activeIndex = 0;
          }
          break;
        case "swiperight":
          if (this.activeIndex === 0) {
            this.swiper.slideTo(end, 500);
            this.activeIndex = end;
          }
          break;
      }
    },
    truncate(val) {
      const trunk = truncateString(val, 150);
      return trunk;
    },
    next() {
      const index = this.swiper.activeIndex;
      const end = this.slides.length - 1;
      if (index === end) {
        this.swiper.slideTo(0, 500);
        this.activeIndex = 0;
      } else {
        this.swiper.slideNext(1000, false);
        this.activeIndex++;
      }
    },
    previous() {
      const index = this.swiper.activeIndex;
      const end = this.slides.length - 1;
      if (!this.swiper.animating) {
        if (index === 0) {
          this.swiper.slideTo(end, 500);
          this.activeIndex = end;
        } else {
          this.swiper.slidePrev(1000, false);
          this.activeIndex--;
        }
      }
    },
    slideChangeTransitionEnd() {
      this.activeIndex = this.swiper.activeIndex;
    },
    findGroup() {
      const group = this.infoPoints.find(groupItem => {
        return groupItem.groupContent.some(item => {
          if (item.point === this.pointName) {
            return groupItem;
          }
        });
      });
      return group;
    },
    changeSlide(val) {
      const that = this;
      this.pointName = val;
      const previousGroup = this.groupName;

      const group = this.findGroup();
      const index = group.groupContent.findIndex(
        item => item.point == this.pointName
      );
      this.slides = group.groupContent;
      this.groupName = group.groupName;
      this.activeIndex = index;

      if (group.groupName !== previousGroup) {
        setTimeout(function() {
          that.swiper.slideTo(index);
        }, 0);
      } else {
        this.swiper.slideTo(index, 1000);
      }
    },
    toggleExpand() {
      if (this.width > 768) {
        return null;
      }
      if (!this.isExpanded) {
        this.swiper.params.coverflowEffect.stretch = 0;
      } else {
        this.swiper.params.coverflowEffect.stretch = 33;
      }
      this.isExpanded = !this.isExpanded;
    },
    onSlideChange() {
      const index = this.swiper.activeIndex;
      const slide = this.slides[index];
      this.$emit("on-slide-change", slide);
    }
  }
};
</script>



<style scoped lang="scss">
/* re-written class from swiper instance */
.swiper-container {
  position: fixed;
  width: 100%;
  max-height: 35wh;
  bottom: 0px;
  z-index: 7;
}

/* expanded class */
.active {
  height: 100%;
}

/* re-written class from swiper instance */
.swiper-inner {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

/* slide item - re-written class from swiper instance */
.swiper-slide {
  bottom: 0px;
  background-position: center;
  background-size: cover;
  height: 100%;
  position: relative;
  color: #2c3e50;
  /* Transition for the bottom property between the slides */
  -webkit-transition: all 1s;
  transition: all 1s;
}

.card__title {
  margin-bottom: 10px;
}
.card__content {
  padding-left: 3em;
  padding-right: 3em;
}
/* extended card */
.active .card {
  padding-top: 85pt;
  border-radius: 0;
  height: 100%;
  @media (max-width: 768px) {
    background: rgba(255, 255, 255, 0.8);
    margin-left: 0;
    margin-right: 0;
  }
}

/* extended swiper container */
.active .swiper-container {
  max-height: 100%;
  position: absolute;
}

/* content image has 100% to keep max 1:1 ratio */
.content-image {
  width: 100%;
}

/* point cursor for expander */
.expander {
  cursor: pointer !important;
}

.card__image {
  margin: 10px auto;
}

/* header */
header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.7em;
  margin-right: 1.7em;
  padding-top: 1em;
}

/* expanded content wrapper to allow scroll if the text reach over 70% of the viewport height */
.content-expanded {
  max-height: 64vh;
  padding-bottom: 1px;
  overflow: auto;
}

/* additional margin for the last content item */
.overflowSpacer{
  height: 64px;
}

/* specific rules for mobile/tablet devices */
@media (max-width: 768px) {
  /* Offset for non active slides */
  .swiper-slide-next,
  .swiper-slide-prev {
    bottom: -2em;
  }
  /* card with shadows */
  .card {
    position: relative;
    bottom: 0;
    display: block;
    min-height: 240px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: #fff;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05), 0 2px 4px 0 rgba(0, 0, 0, 0.1);

    margin-left: 1.6em;
    margin-right: 1.6em;
    padding-bottom: 1px;
  }
}
/* responsivity for desktop */
@media (min-width: 768px) {
  .swiper-slide {
    background: rgba(255, 255, 255, 0.8);
  }
  /* limit container width for desktop version*/
  .swiper-container {
    width: 40%;
    max-height: 100%;
  }
  /* reset margin */
  header {
    margin-left: 0;
    margin-right: 0;
  }
  /* reduce layout padding */
  .card__content {
    padding: 0;
  }
  .content-expanded {
    padding-left: 2.5vw;
    padding-right: 2.5vw;
  }
  .card__title {
    padding-left: 2.5vw;
    padding-right: 2.5vw;
  }
}
</style>
