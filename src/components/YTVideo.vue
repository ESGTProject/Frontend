<template lang="html">
  <div id="container">
    <!-- <h1>Video</h1> -->
    <!-- <iframe title="YouTube video player" class="youtube-player" type="text/html" v-bind:src="embedUrl" frameborder="0" allowFullScreen ref="player" id="player"></iframe> -->
    <youtube ref="player" player-width="540" @ready="ready" :video-id="embedUrl"></youtube>
  </div>
</template>

<script>
import { getIdFromURL, VueYouTubeEmbed } from 'vue-youtube-embed'
export default {
  components: {
    VueYouTubeEmbed
  },
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
      return getIdFromURL(this.url)
    }
  },
  mounted: function () {
    // Nothing
  },
  methods: {
    ready (player) {
      this.player = player
    },
    play: function () {
      this.player.playVideo()
    },
    pause: function () {
      this.player.pauseVideo()
    }
  }
}
</script>

<style lang="css" scoped>
  #container {
    flex: 1 1;
  }
</style>
