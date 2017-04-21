<template lang="html">
  <div id="innercontainer"
    v-bind:class="{ hidden: hidden }">
    <p id="title">{{ this.data.title }}</p>
    <img v-bind:src="this.imgUrl"
    v-on:click="onClick">
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    hidden: Boolean
  },
  computed: {
    imgUrl: function () {
      if (this.data.urlToImage != null) {
        return this.data.urlToImage
      } else {
        return 'https://placehold.it/360x270'
      }
    }
  },
  methods: {
    onClick: function () {
      console.log(this.data.srcUrl)
      window.open(this.data.srcUrl)
    }
  }
}
</script>

<style lang="css" scoped>
  img {
    max-width: 300px;
    max-height: 240px;
  }
  #title {
    font-weight: bold;
  }
  .hidden {
    visibility: hidden;
  }
</style>
