<template lang="html">
  <div id="container">
    <h1>Video</h1>
    <iframe title="YouTube video player" class="youtube-player" type="text/html"
            v-bind:src="embedUrl" frameborder="0" allowFullScreen></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    url: {
      required: true,
      type: String
    }
  },
  computed: {
    embedUrl: function () {
      var regExp = /^.*((youtube\.com|youtu\.be)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      var match = this.url.match(regExp)
      var id = match[7]
      return 'https://www.youtube.com/embed/' + id
    }
  },
  mounted: function () {
    // Nothing
  }
}
</script>

<style lang="css">
  #container {
    flex: 1;
  }
  .youtube-player {
    width: 100%;
    height: 270px
  }
</style>
