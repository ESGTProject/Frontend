<template lang="html">
  <div id="container" ref="cont">
    <SensorValue v-bind:sensorName="sensorName" v-bind:upstreamValue="value"/>
    <vue-chart
    chart-type="LineChart"
    v-bind:columns="columns"
    v-bind:rows="rows"
    v-bind:options="options"
    ref="thisherechart"/>
    <resize-observer @notify="handleResize" />
  </div>
</template>

<script>
import SensorValue from './SensorValue'
export default {
  data () {
    return {
      value: -2,
      columns: [
        {
          'type': 'number',
          'label': 'Timestamp'
        },
        {
          'type': 'number',
          'label': 'Value'
        }],
      rows: [],
      options: {
        hAxis: {
          textPosition: 'none',
          gridlines: {
            color: 'transparent'
          }
        },
        vAxis: {
          textPosition: 'none',
          gridlines: {
            color: 'transparent'
          }
        },
        legend: {
          position: 'none'
        },
        curveType: 'function'
      }
    }
  },
  mounted: function () {
    // var year = 2008
    this.fetchData('https://www.jasonbase.com/things/1lD.json') // Example url change later
    // this.getChartData()
    // var self = this
    this.$refs.cont.onresize = function () {
    }
    // setInterval(function () {
      // this.rows.push([String(year), Math.random() * 1000])
      // year++
    // }.bind(this), 1000)
  },
  methods: {
    fetchData: function (url) {
      this.$http.get(url).then((resp) => {
        console.log(resp.body)
        this.value = resp.body.value
        this.rows = resp.body.oldValues.map(x => {
          return [x.ts, x.value]
        })
      })
    },
    handleResize () {
      // Redraw the chart on resize
      this.$refs.thisherechart.drawChart()
    }
  },
  components: {
    SensorValue
  },
  props: {
    sensorName: String,
    sensorUrl: String
  }
}
</script>

<style lang="css" scoped>

</style>
