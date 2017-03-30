<template lang="html">
  <div id="container">
    <h1>Weather</h1>
    <h4><u>City: {{city}} ({{country}})</u></h4>
    <p>High: {{high}}&deg;F</p>
    <p>Low: {{low}}&deg;F</p>
    <p>{{time%12}} {{AMorPM}}: {{temperature}}&deg;F</p>
    <i class="wi wi-night-sleet"></i>

    <!--icon may or may not work-->
    <p>Humidity: {{humidity}}%</p>
    <p>Rain: {{rain}} inches</p>
    <p>Wind: {{wind}} mph</p>
    <p>Cloudiness: {{cloudiness}}%</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      high: 0,
      low: 0,
      city: 0,
      cloudiness: 0,
      country: 0,
      humidity: 0,
      rain: 0,
      temperature: 0,
      wind: 0,
      time: 0,
      AMorPM: 0,
      icon: 0
    }
  },
  props: {
    dataUrl: String,
    location: String
  },
  mounted: function () {
    this.$http.get(this.dataUrl, {params: {location: this.location}}).then((resp) => {
      console.log(resp)
      console.log(resp.body)
      this.city = resp.body.city
      this.country = resp.body.country
      this.high = resp.body.temp_max
      this.low = resp.body.temp_min
      this.humidity = resp.body.humidity
      this.rain = resp.body.rain
      this.wind = resp.body.wind
      this.cloudiness = resp.body.cloudiness
      this.temperature = resp.body.temp
      this.icon = resp.body.icon
      var d = resp.body.timestamp
      var k = new Date(d)
      this.time = k.getHours()
    })
    if (this.time < 12) {
      this.AMorPM = 'AM'
    } else {
      this.AMorPM = 'PM'
    }
    // console.log(n)  // print n to console
    setInterval(function () {
      this.$http.get(this.dataUrl, {params: {location: this.location}}).then((resp) => {
        this.city = resp.body.city
        this.country = resp.body.country
        this.high = resp.body.temp_max
        this.low = resp.body.temp_min
        this.humidity = resp.body.humidity
        this.rain = resp.body.rain
        this.wind = resp.body.wind
        this.cloudiness = resp.body.cloudiness
        this.temperature = resp.body.temp
        this.icon = resp.body.icon
        var d = resp.body.timestamp
        var k = new Date(d)
        this.time = k.getHours()
      })
      if (this.time < 12) {
        this.AMorPM = 'AM'
      } else {
        this.AMorPM = 'PM'
      }
    }.bind(this), 60000) // update time every 1 second
  }
}
</script>

<style lang="css">
#container {
  flex: 1;
}
</style>
