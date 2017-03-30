<template lang="html">
  <div id="container">
    <h1>Clock</h1>
    <h2>{{value}}</h2>
  </div>
</template>

<script>

export default {
  data () {
    return {
      value: 0,
      hour: 0,
      minutes: 0,
      AMorPM: 0
    }
  },
  mounted: function () {
    var moment = require('moment')
    var d = new Date()
    var n = d.toTimeString()
    console.log(n)  // print n to console
    this.value = moment().format('LT')
    setInterval(function () {
      d = new Date()
      this.value = moment().format('LT')
    }.bind(this), 30000) // update time every second
  }
}
</script>

<style lang="css">
#container {
  flex: 0 auto;
}
</style>
