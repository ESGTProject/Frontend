z<template lang="html">
  <div id="container">
    <h1 class="goright">Agenda</h1>
    <div id="ev-container">
      <div class="goright" v-for="event in events">
        <p id="eventline"><span>{{ event.date }}</span>:<span>{{ event.summary }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  var moment = require('moment')
  export default {
    data () {
      return {
        today: moment(),
        events: []
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
        if (newVal !== '') {
          this.fetchData()
        }
        return newVal
      }
    },
    computed: {
    },
    methods: {
      fetchData: function () {
        var self = this
        this.$http.get(this.dataUrl, {params: {user_uid: this.userUID, limit: 5}}).then((resp) => {
          // console.log(resp.body)
          self.events = resp.body.map((ev) => {
            return {
              date: moment(ev.start).format('MM-DD'),
              summary: ev.summary
            }
          })
        })
      }
    }
  }
</script>

<style lang="css" scoped>
  #container {
    flex: auto 1 auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
  }
  #ev-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #eventline {
    margin: 0px;
    font-size: 20px;
  }
  #subj {
    font-size: 22px;
  }
  #mail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .goright {
    align-self: flex-end;
  }
  h1 {
    margin: 0px;
    font-size: 3em;
  }
  p {
    margin: 0px;
    font-size: 1em;
  }
</style>
