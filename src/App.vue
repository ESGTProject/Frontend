<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div v-bind:class="{'overlay': userId}"> -->
    <div class="vert">
      <SensorValue sensorName="Light" sensorUrl="http://esgt.ddns.net:8000/resource/light?limit=1"/>
      <SensorGraph sensorName="Light" sensorUrl="http://esgt.ddns.net:8000/resource/light"/>
      <Clock/>
    </div>
    <div class='vert'>
      <News dataUrl="http://esgt.ddns.net:8000/resource/news" v-bind:source="config.News.source"/>
      <YTVideo v-bind:url="config.YTVideo.url"/>
    </div>
    <div class="vert">
      <Weather dataUrl="http://esgt.ddns.net:8000/resource/weather" v-bind:location="config.Weather.location"/>
      <Calendar/>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Weather from './components/Weather'
import SensorValue from './components/SensorValue'
import SensorGraph from './components/SensorGraph'
import Clock from './components/Clock'
import News from './components/News'
import YTVideo from './components/YTVideo'
import Calendar from './components/Calendar'
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyAhfZI9SSNWMVcoODVovNrfLlmh28vVpvk',
  authDomain: 'esgtapp.firebaseapp.com',
  databaseURL: 'https://esgtapp.firebaseio.com',
  storageBucket: 'esgtapp.appspot.com',
  messagingSenderId: '577511514187'
}

let firebaseApp = Firebase.initializeApp(config)
let PythonShell = require('python-shell')

let db = firebaseApp.database()
let rootRef = db.ref()
let currUser = db.ref('devices/-KgICjJhWb4elAflr1_J/user_current')

export default {
  name: 'app',
  components: {
    Hello,
    Weather,
    SensorValue,
    SensorGraph,
    Clock,
    News,
    YTVideo,
    Calendar
  },
  data () {
    return {
      pyshell: new PythonShell('hover/sender.py'),
      userId: '',
      config: {
        News: {
          source: 'google-news'
        },
        Weather: {
          location: '4180439'
        },
        YTVideo: {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      }
    }
  },
  firebase: function () {
    return {
    }
  },
  beforeCreate: function () {
    Firebase.auth().signInAnonymously().catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage + errorCode)
    })
  },
  mounted: function () {
    var self = this
    currUser.on('value', function (u) {
      self.userId = u.val()
      if (self.userId !== '') {
        console.log(self.suserId)
        rootRef.child('users/' + self.userId).on('value', function (conf) {
          var config = conf.val().config
          console.log(config)
          console.log(config.display_name)
          self.config.News.source = config.news_source
          self.config.Weather.location = config.weather_location
          self.config.YTVideo.url = config.yt_url
        })
      } else {
        console.log('Showing device ID')
      }
    })
    
  },
  unmounted: function () {
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: #ffffff;
  height: 98vh;
}
.vert {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
