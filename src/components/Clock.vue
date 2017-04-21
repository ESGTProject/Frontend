<template lang="html">
  <div id="container">
    <!-- <h1>Clock</h1> -->
    <h2>{{date}}</h2>
    <h2>{{time}}</h2>
    </br>
    <!-- <iframe src="http://free.timeanddate.com/clock/i5ntccrp/n25/szw110/szh110/hbw0/hfc000/cf100/hgr0/fav0/fiv0/mqcfff/mql15/mqw4/mqd94/mhcfff/mhl15/mhw4/mhd94/mmv0/hhcbbb/hmcddd/hsceee" frameborder="0" width="110" height="110"></iframe> -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      date: 0,
      time: 0
    }
  },
  mounted: function () {
    var moment = require('moment')
    this.date = moment().format('LL')
    this.time = moment().format('LT')
    setInterval(function () {
      this.date = moment().format('LL')
      this.time = moment().format('LT')
    }.bind(this), 1000) // update time every second
  }
}
</script>

<style lang="css" scoped>
#container {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}
h2 {
  margin: 2px;
  font-size: 2.2em;
  align-self: flex-start;
}
</style>
