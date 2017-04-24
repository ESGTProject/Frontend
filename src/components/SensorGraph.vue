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
        chartArea: {top: 0, left: 0, height: '100%', width: '100%'},
        backgroundColor: '#000000',
        series: {
          0: {
            color: '#ffffff'
          }
        },
        hAxis: {
          textPosition: 'none',
          gridlines: {
            color: 'transparent'
          }
        },
        vAxis: {
          textPosition: 'none',
          baselineColor: 'transparent',
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
      this.$http.get(url, {params: {limit: 20}}).then((resp) => {
        var data = resp.body
        this.value = parseFloat(data[0].value.toFixed(1))
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
      default: 5,
      type: Number
    }
  }
}
</script>

<style scoped>
  #container {
    flex: 1 auto auto;
    align-items: flex-end;
    align-self: flex-start;
    justify-self: flex-start;
    width: 400px;
  }

</style>
