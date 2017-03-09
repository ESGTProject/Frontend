<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <Hello/> -->
    <SensorValue sensorName="Light" sensorUrl="http://esgt.ddns.net:8000/resource/light?limit=1"/>
    <SensorGraph sensorName="Light" sensorUrl="http://esgt.ddns.net:8000/resource/light"/>
    <Weather/>
    <Clock/>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Weather from './components/Weather'
import SensorValue from './components/SensorValue'
import SensorGraph from './components/SensorGraph'
import Clock from './components/Clock'
export default {
  name: 'app',
  components: {
    Hello,
    Weather,
    SensorValue,
    SensorGraph,
    Clock
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
