<template lang="html">
  <div id="container">
    <h1>Calendar</h1>
    <div class="controls">
      <span class="next label" v-on:click="prevMonth()">&lt</span>
      <span id="current-month" class="label bold">{{currDate.format('MMM')}}</span>
      <span class="previous label" v-on:click="nextMonth()">&gt</span>
    </div>
  <div class="calendar" id="calendar">
    <div id="header">
      <div class='header-day'>Sun</div>
      <div class='header-day'>Mon</div>
      <div class='header-day'>Tue</div>
      <div class='header-day'>Wed</div>
      <div class='header-day'>Thu</div>
      <div class='header-day'>Fri</div>
      <div class='header-day'>Sat</div>
    </div>
    <div id="main-cal">
      <div class='blank-day-box' v-for="blank in blanks"></div>
      <div class='day-box' v-for="day in days">
        <p class='date'>{{ day.format('DD') }}</p>
      </div >
    </div>
    
  </div>
</template>

<script>
  var moment = require('moment')
  export default {
    data () {
      return {
        today: moment(),
        currDate: moment(),
        events: [
          {
            title: 'Blaze it',
            date: '2017-04-20'
          }
        ]
      }
    },
    props: {
      dataUrl: String,
      userUID: String
    },
    mounted: function () {
    },
    watch: {
      userUID: function (newVal, oldVal) {
        this.fetchData()
        return newVal
      }
    },
    computed: {
      days: function () {
        var fD = moment(this.currDate).startOf('month')
        // var lD = mome3nt(this.currDate).endOf('month')
        var days = []
        for (var c = 0; days.length < this.currDate.daysInMonth(); c++) {
          days.push(moment(fD).add(c, 'day'))
        }
        return days
      },
      blanks: function () {
        return new Array(moment(this.currDate).startOf('month').day())
      }
    },
    methods: {
      fetchData: function () {
        this.$http.get(this.dataUrl, {params: {user_uid: this.userUID}}).then((resp) => {
          console.log(resp.body)
        })
      },
      nextMonth: function () {
        this.currDate.add(1, 'month')
      },
      prevMonth: function () {
        this.currDate.subtract(1, 'month')
      }
    }
  }
</script>

<style lang="css" scoped>
  #container {
    flex: auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  #controls {
    display: flex;
    flex: auto;
    justify-content: center;
    flex-direction: row;
  }
  #header {
    display: flex;
    flex: auto;
    justify-content: space-around;
    flex-direction: row;
  }
  .header-day {
    padding: 5px;
  }
  #main-cal {
    display: flex;
    flex-flow: row wrap;
    /*justify-content: space-around;*/
  }
  .label {
    font-weight: bolder;
    font-size: 20px
  }
  h1 {
    margin: 0px;
  }
  .blank-day-box {
    flex: 0 1 calc(14.28% - 4px);
    padding: 2px 2px 2px 2px;
  }
  .day-box {
    display: flex;
    flex: 0 1 calc(14.28% - 4px);
    border: solid white;
    border-width: 2px 2px 2px 2px;
  }
  .date {
    font-weight: bold;
    font-size: 14px;
    margin: 0px 0px 8px 0px;
    align-self: flex-start;
  }
</style>
