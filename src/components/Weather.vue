<template lang="html">
  <div id="container">
    <h1>Weather</h1>
    <h3><u>City: {{city}} ({{country}})</u></h3>
    <div>
      <p><img id="img" v-bind:src="condMap[this.icon]">
        <span id="maintemp">{{temperature}}&deg;F
        </span></p> </div>
        <div>
          <h3> <img id="img2" v-bind:src="condMap['up']"> {{high}}&deg;F <img id="img2" v-bind:src="condMap['down']"> {{low}}&deg;F</h3>
          <h3>
            Humidity: {{humidity}}% Rain: {{rain}} inches </h3>
            <h3>
              Wind: {{wind}} mph Cloudiness: {{cloudiness}}%
            </h3>
          </div>
          <div id="scroll">
            <h3>
              {{timenext1}}: {{Math.round(forecastnext[0] * 100) / 100}} &deg;F
              <br></br> {{timenext2}}: {{Math.round(forecastnext[1] * 100) / 100}} &deg;F
              <br></br> {{timenext3}}: {{Math.round(forecastnext[2] * 100) / 100}} &deg;F
              <br></br> {{timenext4}}: {{Math.round(forecastnext[3] * 100) / 100}} &deg;F
              <br></br> {{timenext5}}: {{Math.round(forecastnext[4] * 100) / 100}} &deg;F
              <br></br> {{timenext6}}: {{Math.round(forecastnext[5] * 100) / 100}} &deg;F
              <br></br> {{timenext7}}: {{Math.round(forecastnext[6] * 100) / 100}} &deg;F
              <br></br> {{timenext8}}: {{Math.round(forecastnext[7] * 100) / 100}} &deg;F
            </h3>
          </div>
        </div>
      </template>
      <script>
      var moment = require('moment')
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
            timenext1: 0,
            timenext2: 0,
            timenext3: 0,
            timenext4: 0,
            timenext5: 0,
            timenext6: 0,
            timenext7: 0,
            timenext8: 0,
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
              'down': require('../assets/down.png')
            }
          }
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
              var k = resp.body.forecast_dt
              this.timenext1 = moment(k[0]).format('lll')
              this.timenext2 = moment(k[1]).format('lll')
              this.timenext3 = moment(k[2]).format('lll')
              this.timenext4 = moment(k[3]).format('lll')
              this.timenext5 = moment(k[4]).format('lll')
              this.timenext6 = moment(k[5]).format('lll')
              this.timenext7 = moment(k[6]).format('lll')
              this.timenext8 = moment(k[7]).format('lll')
            })
          }
        },
        mounted: function () {
          this.fetchData()
          // console.log(n)  // print n to console
          setInterval(function () {
            this.fetchData()
          }.bind(this), 60000) // update time every 1 second
        }
      }
      </script>

      <style lang="css" scoped>
      #container {
        flex: 1;
      }
      #scroll {
        width: 100%;
        height: 70px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        -webkit-animation-name: move;
        -webkit-animation-duration: 4s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
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
      #img {
        position: relative;
        width: 15%;
      }
      #img2 {
        position: relative;
        width: 10%;
        hight: 10%;
      }
      #maintemp {
        font-size: 40px;
      }
      </style>
