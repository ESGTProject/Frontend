<template>
  <div id="app">
    <div id="cont" class='vert'>
      <!-- <div v-bind:class="{'overlay': userId}"> -->
      <!-- <div id="overlay" v-show="isHidden2"> -->
        <!-- <img id="invimg" src="https://maxcdn.icons8.com/Share/icon/Transport//isHidden2_takeoff1600.png"> -->
        <!-- <h2 id="flightinfo">Flight GT 1885 to New York departs in 2 hours and 42 minutes</h2> -->
      <!-- </div> -->
     <transition name="fade">
        <div class='vert' v-show="isHidden">
          <Clock v-show="isHidden"/>
          <!-- <SensorGraph v-show="isHidden" sensorName="Light" v-bind:sensorUrl="baseUrl + ':8000/resource/light'"/>           -->
          <SensorGraph v-show="isHidden2" sensorName="Light" v-bind:sensorUrl="baseUrl + ':8000/resource/light'"/>          
          <Gmail v-show="isHidden2" v-bind:dataUrl="baseUrl + ':8000/resource/gmail'" v-bind:userUID="userId"/>
        </div>

      </transition>
      <transition name="fade">
        <div class='vert' v-show="isHidden">
            <Weather v-show="isHidden" v-bind:dataUrl="baseUrl + ':8000/resource/weather'" v-bind:location="config.Weather.location"/>
            <transition name="fade">
                <div class='horz2'>
                  <SensorValueSmall v-show="isHidden2" sensorName="Room Temperature" v-bind:sensorUrl="baseUrl + ':8000/resource/temperature'"/>
                  <SensorValueSmall v-show="isHidden2" sensorName="Humidity" v-bind:sensorUrl="baseUrl + ':8000/resource/humidity'"/>
                </div>
            </transition>
            <Agenda v-show="isHidden2" v-bind:dataUrl="baseUrl + ':8000/resource/calendar'" v-bind:userUID="userId"/>
          </div>
      </transition>
    </div>
      <transition name="fade">
        <div class='horz2'>
          <YTVideo ref='ytvideo' v-show="isHidden" v-bind:url="config.YTVideo.url"/>
          <News v-if="isHidden" v-bind:hidden="!isHidden" v-bind:dataUrl="baseUrl + ':8000/resource/news'" v-bind:source="config.News.source" ref="news"/>
        </div>
    </transition>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Weather from './components/Weather'
import SensorValue from './components/SensorValue'
import SensorValueSmall from './components/SensorValueSmall'
import SensorGraph from './components/SensorGraph'
import Clock from './components/Clock'
import News from './components/News'
import YTVideo from './components/YTVideo'
import Calendar from './components/Calendar'
import Agenda from './components/Agenda'
import Gmail from './components/Gmail'
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyAhfZI9SSNWMVcoODVovNrfLlmh28vVpvk',
  authDomain: 'esgtapp.firebaseapp.com',
  databaseURL: 'https://esgtapp.firebaseio.com',
  storageBucket: 'esgtapp.appspot.com',
  messagingSenderId: '577511514187'
}

let firebaseApp = Firebase.initializeApp(config)

let db = firebaseApp.database()
let rootRef = db.ref()
let currUser = db.ref('devices/-KgICjJhWb4elAflr1_J/user_current')

// WebSockets!
var Socket = require('simple-websocket')
var socket = new Socket('ws://0.0.0.0:8000/echo')

export default {
  name: 'app',
  components: {
    Hello,
    Weather,
    SensorValue,
    SensorValueSmall,
    SensorGraph,
    Clock,
    News,
    YTVideo,
    Calendar,
    Agenda,
    Gmail
  },
  data () {
    return {
      state: 0,
      userId: '',
      baseUrl: 'http://143.215.100.14',
      // baseUrl: 'http://esgt.ddns.net',
      hoverIn: 0,
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
      },
      isHidden: false,
      isHidden2: false
    }
  },
  firebase: function () {
    return {
    }
  },
  watch: {
    state: function (newVal, oldVal) {
      switch (newVal) {
        case 0:
          this.isHidden = false
          this.isHidden2 = false
          break
        case 1:
          this.isHidden = true
          this.isHidden2 = false
          break
        case 2:
          this.isHidden = true
          this.isHidden2 = true
          break
      }
      return newVal
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
    this.state = 2
    var self = this
    currUser.on('value', function (u) {
      self.userId = u.val()
      if (self.userId !== '') {
        console.log(self.userId)
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
    socket.on('data', function (data) {
      var inp = data.toString()
      var hoverIn = parseInt(inp.match(/\d/g)[0])
      switch (hoverIn) {
        case 1:
          self.$refs.news.goNext()
          break
        case 2:
          self.$refs.news.goPrev()
          break
        case 3:
          console.log('Showing')
          if (self.state < 2) {
            self.state += 1
          }
          break
        case 4:
          console.log('Hiding')
          self.state = 0
          break
        case 5:
          self.$refs.ytvideo.play()
          break
        case 6:
          self.$refs.ytvideo.pause()
          break
        case 7:
          console.log('Showing')
          // self.isHidden = false
          break
        case 8:
          console.log('Hiding')
          // self.isHidden = true
          break
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
  flex-direction: column;
  justify-content: space-around;
  color: #ffffff;
  height: 98vh;
}
#cont {
  flex-direction: row;
  justify-content: space-around;
}
.vert {
  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.horz {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.horz2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.hidden {
  visibility: hidden;
}
.goleft {
  align-self: flex-end;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
#flightinfo {
  font-size: 3em;
}
#invimg {
  width: 20%;
  filter: invert(100%);
}
</style>
