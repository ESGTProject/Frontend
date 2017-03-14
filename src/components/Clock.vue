<template lang="html">
  <div id="container">
    <h1>Clock</h1>
<p>{{value}}</p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      value: 0
    }
  },
  mounted: function () {
    var d = new Date()
    var n = d.toTimeString()
    console.log(n)  // print n to console
    this.value = n
    setInterval(function () {
      d = new Date()
      this.value = d.toTimeString()
    }.bind(this), 1000) // update time every second
  }
}
</script>

<style lang="css">
#container {
  flex: 0 auto;
}
</style>
