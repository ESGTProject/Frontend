<template>
  <div id="container">
    <SensorValue v-bind:sensorName="sensorName" v-bind:upstreamUnits="units" v-bind:upstreamValue="value"/>
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
      interval: -1,
      units: 'units',
      columns: [
        {
          'type': 'string',
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
    this.fetchData(this.sensorUrl)
    this.interval = setInterval(function () {
      this.fetchData(this.sensorUrl)
    }.bind(this), this.updateInterval * 1000)
  },
  unmounted: function () {
    clearInterval(this.interval)
  },
  methods: {
    fetchData: function (url) {
      this.$http.get(url).then((resp) => {
        var data = resp.body
        this.value = parseFloat(data[0].value.toFixed(3))
        this.units = data[0].units
        this.rows = data.reverse().map(x => {
          var d = new Date(x.timestamp).toString()
          return [d.slice(16, 24), x.value]
        })
      })
    }
  },
  components: {
    SensorValue
  },
  props: {
    sensorName: String,
    sensorUrl: String,
    updateInterval: {
      default: 30,
      type: Number
    }
  }
}
</script>

<style scoped>
  #container {
    flex: auto;
  }
</style>
