<template lang="html">
  <div id="container">
    <SensorValue v-bind:sensorName="sensorName" v-bind:upstreamValue="value"/>
    <vue-chart
    chart-type="LineChart"
    v-bind:columns="columns"
    v-bind:rows="rows"
    v-bind:options="options"/>
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
  #container {
    flex: 1
  }
</style>
