<template lang="html">
  <div id="container">
    <h1>{{ sensorName }}</h1>
    <p id="value">{{ upstreamValue ? upstreamValue : value }} <span>{{ upstreamUnits ? upstreamUnits : units }}</span></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: -1,
      interval: -1,
      units: 'units'
    }
  },
  props: {
    sensorName: String,
    sensorUrl: String,
    upstreamValue: Number,
    upstreamUnits: String,
    updateInterval: {
      default: 30,
      type: Number
    }
  },
  mounted: function () {
    if (this.sensorUrl) {
      this.fetchData(this.sensorUrl)
      // Call the update function every x seconds
      this.interval = setInterval(function () {
        this.fetchData(this.sensorUrl)
      }.bind(this), this.updateInterval * 1000)
    }
  },
  unmounted: function () {
    clearInterval(this.interval)
  },
  methods: {
    fetchData: function (url) {
      this.$http.get(url).then((resp) => {
        var data = resp.body[0]
        this.value = data.value.toFixed(3)
        this.units = data.units
      })
    }
  }
}
</script>

<style lang="css" scoped>
  #container {
    flex: 0 auto;
  }
  p {
    font-size: 1.5em;
  }
  #value {
    font-weight: bold;
  }
</style>
