<template lang="html">
  <div id="container">
    <h1>Feed</h1>
    <carousel-3d>
      <slide
        v-for="(item, ind) in data"
        v-bind:index="ind">
        <NewsItem v-bind:data="item"/>
      <slide>
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
      data: []
    }
  },
  props: {
    dataUrl: String,
    source: String
  },
  mounted: function () {
    this.fetchData(this.dataUrl)
  },
  methods: {
    fetchData: function (url) {
      this.$http.get(url, {params: {source: this.source}}).then((resp) => {
        var d = resp.body
        console.log(d)
        this.data = d
      })
    }
  }
}
</script>

<style lang="css" scoped>
  #container {
    flex: 1;
    height: 98vh;
    overflow: auto;
  }
  slide {

  }
</style>
