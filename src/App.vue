<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="vert">
      <SensorValue sensorName="Light" sensorUrl="http://esgt.ddns.net:8000/resource/light?limit=1"/>
      <SensorGraph sensorName="Light" sensorUrl="http://esgt.ddns.net:8000/resource/light"/>
      <Clock/>
    </div>
    <div class='vert'>
      <News dataUrl="http://esgt.ddns.net:8000/resource/news" source="google-news"/>
      <Calendar />
    </div>
    <Weather/>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Weather from './components/Weather'
import SensorValue from './components/SensorValue'
import SensorGraph from './components/SensorGraph'
import Clock from './components/Clock'
import News from './components/News'
export default {
  name: 'app',
  components: {
    Hello,
    Weather,
    SensorValue,
    SensorGraph,
    Clock,
    News
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
  color: #2c3e50;
  height: 98vh;
}
.vert {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
