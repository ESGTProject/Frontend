<template lang="html">
  <div id="container">
    <!-- <h2 class="goleft">Weather</h2> -->
    <h3 class="goleft city"><u>{{city}} ({{country}})</u></h3>
    <div class="valign goleft">
      <img id="img" v-bind:src="condMap[this.icon]">
      <p id="maintemp">{{temperature}}&deg;F</p>
    </div>
    <div class="valign goleft">
      <h3>
        <img id="img2" v-bind:src="condMap['up']">
        <span class="range-condinfo">{{high}}&deg;F</span>
        <img id="img2" v-bind:src="condMap['down']">
        <span class="range-condinfo">{{low}}&deg;F</span>
      </h3>
    </div>
    <div class="valign goleft">
      <!-- <span class="condinfo"><img id="img3" v-bind:src="condMap['humid']"> {{humidity}}% &nbsp;</span> -->
      <span class="rain-condinfo"><img id="img3" v-bind:src="condMap['10d']"> {{rain}} inches</span>
    </div>
    <div class="valign goleft">
      <h3>
        <span class="condinfo"><img id="img3" v-bind:src="condMap['wind']"> {{wind}} mph</span>
        <span class="condinfo"><img id="img3" v-bind:src="condMap['03d']"> {{cloudiness}}%</span>
      </h3>
    </div>
    <div id="scroll" ref="scroll" class="goleft">
      <div class="othertemp" v-for="(fn, index) in forecastnext">
        <h3>{{timenext[index]}}: {{Math.round(fn * 100) / 100}} &deg;F</h3>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require('moment')
// import { Carousel, Slide } from 'vue-carousel'
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
      icon: 0,
      forecastnext: 0,
      timenext: 0,
      condMap: {
        '01d': require('../assets/sun.png'),
        '02d': require('../assets/partly-cloudy-day.png'),
        '03d': require('../assets/cloudy.png'),
        '04d': require('../assets/broken-clouds.png'),
        '09d': require('../assets/shower-rain.png'),
        '10d': require('../assets/rain.png'),
        '11d': require('../assets/thunderstorm.png'),
        '13d': require('../assets/snow.png'),
        '50d': require('../assets/fog.png'),
        '01n': require('../assets/clear-night.png'),
        '02n': require('../assets/partly-cloudy-night.png'),
        '03n': require('../assets/cloudy-night.png'),
        '04n': require('../assets/broken-clouds-night.png'),
        '09n': require('../assets/shower-rain-night.png'),
        '10n': require('../assets/rain-night.png'),
        '11n': require('../assets/thunderstorm-night.png'),
        '13n': require('../assets/snow-night.png'),
        '50n': require('../assets/fog-night.png'),
        'up': require('../assets/up.png'),
        'down': require('../assets/down.png'),
        'wind': require('../assets/wind.png'),
        'humid': require('../assets/humidity.png')
      }
    }
  },
  components: {
  },
  props: {
    dataUrl: String,
    location: String
  },
  methods: {
    fetchData: function () {
      this.$http.get(this.dataUrl, {params: {location: this.location}}).then((resp) => {
        console.log(resp)
        console.log(resp.body)
        this.city = resp.body.city
        this.country = resp.body.country
        this.high = resp.body.temp_max
        this.low = resp.body.temp_min
        this.humidity = resp.body.humidity
        this.rain = Math.round(resp.body.rain * 100) / 100
        this.wind = resp.body.wind
        this.cloudiness = resp.body.cloudiness
        this.temperature = resp.body.temp
        this.icon = resp.body.icon
        this.forecastnext = resp.body.forecast_ave
        var d = resp.body.dt
        this.time = moment(d).format('h A')
        this.timenext = resp.body.forecast_dt.map((dt) => {
          return moment.utc(dt).local().format('lll')
        })
      })
    },
    goNext: function () {
      console.log(this.$refs.scroll)
    }
  },
  watch: {
    location: function (newVal, oldVal) {
      this.fetchData()
      return newVal
    }
  },
  mounted: function () {
    this.fetchData()
    setTimeout(function () {
      this.fetchData()
    }.bind(this), 1000)
    // console.log(n)  // print n to console
    setInterval(function () {
      this.fetchData()
    }.bind(this), 60000) // update time every 1 second
  }
}
</script>

<style lang="css" scoped>
#container {
  flex: 1 1 auto;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
}
#scroll {
  width: 100%;
  height: 30px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-animation-name: move;
  -webkit-animation-duration: 4s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
h3 {
  margin: 4px;
}
h2 {
  margin: 10px;
}
.goleft {
  align-self: flex-end;
}
.center {
  margin: auto;
  text-align: center;
  width: 25%;
  padding: 10px;
}
.right {
  position: absolute;
  right: 0px;
  width: 25%;
  padding: 10px;
}
.valign {
  display: flex;
  align-content: space-around;
}
#maintemp {
  margin: 0px;
  font-size: 3.8em;
}
#img {
  /*position: relative;*/
  /*width: 18%*/
  width: 90px;
  height: 90px;
}
.rain-condinfo {
  font-size: 3em;
}
.range-condinfo {
  font-size: 1.6em;
}
.condinfo {
  font-size: 30px;
}
#img2 {
  width: 25px;
  height: 25px;
}
#img3 {
  position: relative;
  width: 40px;
  height: 40px;
}

.othertemp{
  font-size: 18px;
  text-align: center;
}
</style>
