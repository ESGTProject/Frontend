<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <Hello/> -->
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
     >
      <grid-item
        :x="layout[0].x"
        :y="layout[0].y"
        :w="layout[0].w"
        :h="layout[0].h"
        :i="layout[0].i"
      ><SensorValue sensorName="Light"/></grid-item>
      <grid-item
        :x="layout[1].x"
        :y="layout[1].y"
        :w="layout[1].w"
        :h="layout[1].h"
        :i="layout[1].i"
      ><SensorGraph sensorName="Light"/></grid-item>
      <grid-item
        :x="layout[2].x"
        :y="layout[2].y"
        :w="layout[2].w"
        :h="layout[2].h"
        :i="layout[2].i"
      ><Weather/></grid-item>
      <grid-item
        :x="layout[3].x"
        :y="layout[3].y"
        :w="layout[3].w"
        :h="layout[3].h"
        :i="layout[3].i"
      ><Clock/></grid-item>
    </grid-layout>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Weather from './components/Weather'
import SensorValue from './components/SensorValue'
import SensorGraph from './components/SensorGraph'
import Clock from './components/Clock'
var VueGridLayout = require('vue-grid-layout')
var GridLayout = VueGridLayout.GridLayout
var GridItem = VueGridLayout.GridItem

export default {
  name: 'app',
  components: {
    Hello,
    Weather,
    SensorValue,
    SensorGraph,
    Clock,
    GridLayout,
    GridItem
  },
  data () {
    return {
      layout: [
        {'x': 0, 'y': 0, 'w': 2, 'h': 4, 'i': '0'},
        {'x': 2, 'y': 0, 'w': 8, 'h': 8, 'i': '1'},
        {'x': 0, 'y': 4, 'w': 3, 'h': 13, 'i': '2'},
        {'x': 4, 'y': 4, 'w': 2, 'h': 2, 'i': '3'}
      ],
      draggable: true,
      resizable: true,
      index: 0
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: space-around;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
