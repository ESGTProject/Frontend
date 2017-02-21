<template lang="html">
  <div id="container">
    <h1>Weather</h1>
    <p>High: {{high}}&deg;F</p><br>
    <p>Low: {{low}}&deg;F</p><br>
    <p>{{time%12}} {{AMorPM}}: {{hour1}}&deg;F</p><br>
    <p>{{(time+1)%12}} {{AMorPM}}: {{hour2}}&deg;F</p><br>
    <p>{{(time+2)%12}} {{AMorPM}}: {{hour3}}&deg;F</p><br>
    <p>{{(time+3)%12}} {{AMorPM}}: {{hour4}}&deg;F</p><br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      high: 0,
      low: 0,
      hour1: 0,
      hour2: 0,
      hour3: 0,
      hour4: 0,
      time: 0,
      AMorPM: 0
    }
  },
  mounted: function () {
    var d = new Date()
    var n = d.getHours()
    var temp = [23, 56, 23, 67, 23, 67, 98, 34, 78, 15, 57, 89, 34, 78, 354, 67, 89, 34, 78, 78, 45, 45, 67, 45]
    console.log(n)  // print n to console
    this.time = n
    if (n < 12) {
      this.AMorPM = 'AM'
    } else {
      this.AMorPM = 'PM'
    }
    this.hour1 = temp[n % 24]
    this.hour2 = temp[(n + 1) % 24]
    this.hour3 = temp[(n + 2) % 24]
    this.hour4 = temp[(n + 3) % 24]
    this.high = Math.max(...temp)
    this.low = Math.min(...temp)
    setInterval(function () {
    //  var temp = [23, 56, 23, 67, 23, 67, 98, 34, 78, 15, 57, 89, 34, 78, 354, 67, 89, 34, 78, 78, 45, 45, 67, 45]
      d = new Date()
      n = d.getHours()
      this.time = n
      if (n < 12) {
        this.AMorPM = 'AM'
      } else {
        this.AMorPM = 'PM'
      }
      this.hour1 = temp[n % 24]
      this.hour2 = temp[(n + 1) % 24]
      this.hour3 = temp[(n + 2) % 24]
      this.hour4 = temp[(n + 3) % 24]
      this.high = Math.max(...temp)
      this.low = Math.min(...temp)
    }.bind(this), 1000) // update time every second
  }
}
</script>

<style lang="css">
#container {
  flex: 1;
}
</style>
