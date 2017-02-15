<template lang="html">
  <div id="container">
    <h1>{{ sensorName }}</h1>
    <p>{{ upstreamValue ? upstreamValue : value }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: -1
    }
  },
  props: {
    sensorName: String,
    sensorUrl: String,
    upstreamValue: Number
  },
  mounted: function () {
    // if (this.sensorUrl) {
    // }
    this.fetchData('https://www.jasonbase.com/things/aYE.json') // Example url change later
  },
  methods: {
    fetchData: function (url) {
      this.$http.get(url).then((resp) => {
        console.log(resp.body)
        this.value = resp.body.value
      })
    }
  }
}
</script>

<style lang="css" scoped>
  #container {
    flex: 1
  }
  p {
    font-size: 1.5em;
  }
</style>
