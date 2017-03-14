<template lang="html">
  <div id="innercontainer">
    <p>{{ title }}</p>
    <img v-bind:src="imgUrl"
    v-on:click="onClick">
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: this.data.title,
      srcUrl: this.data.url,
      imgUrl: this.data.urlToImage
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick: function () {
      console.log(this.srcUrl)
      window.open(this.srcUrl)
    }
  }
}
</script>

<style lang="css" scoped>
  img {
    max-width: 300px;
    max-height: 240px;
  }
</style>
