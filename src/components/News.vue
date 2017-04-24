<template lang="html">
  <div id="container">
    <carousel-3d
      ref="carousel"
      v-bind:controlsVisible="true"
      v-bind:inverse-scaling="1000"
      v-bind:display="2"
      v-bind:border="0">
      <slide
        v-for="(item, ind) in data"
        v-bind:index="ind"
        >
        <NewsItem v-bind:data="item" v-bind:hidden="hidden"/>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import NewsItem from './NewsItem'
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  components: {
    NewsItem,
    Carousel3d,
    Slide
  },
  data () {
    return {
      data: [],
      isVis: false
    }
  },
  props: {
    dataUrl: String,
    source: String,
    hidden: Boolean
  },
  watch: {
    source: function (newVal, oldVal) {
      this.fetchData()
      return newVal
    },
    hidden: function (newVal, oldVal) {
      return newVal
    }
  },
  mounted: function () {
    setTimeout(function () {
      this.fetchData()
    }.bind(this), 1000)
  },
  methods: {
    goNext: function () {
      this.$refs.carousel.goNext()
    },
    goPrev: function () {
      this.$refs.carousel.goPrev()
    },
    fetchData: function () {
      this.$http.get(this.dataUrl, {params: {source: this.source}}).then((resp) => {
        var d = resp.body
        // console.log(d, this.source)
        this.data = d
        this.$refs.carousel.setSize() // manually refresh
      })
    }
  }
}
</script>

<style lang="css" scoped>
  #container {
    flex: 5 auto;
  }
  /*carousel-3d {
    visibility: hidden;
  }
  carousel-3d.vis {
    visibility: visible;
  }*/
  .carousel-3d-slide.current {
    background: none;
  }
  .carousel-3d-slide {
    background: none;
  }
  .hidden {
    visibility: hidden;
  }
</style>
