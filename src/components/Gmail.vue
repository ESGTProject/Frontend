<template lang="html">
  <div id="container">
    <h1 class="goright">Mail</h1>
    <div id="ev-container">
      <div class="goright" id='mail' v-for="m in mail">
        <p id="eventline" class="goright">At: {{ m.date }}, From: {{ m.from }}</p>
        <p id="subj" class="goright">{{ m.subject }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  var moment = require('moment')
  export default {
    name: 'Gmail',
    data () {
      return {
        today: moment(),
        mail: []
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
        this.$http.get(this.dataUrl, {params: {user_uid: this.userUID}}).then((resp) => {
          // console.log(resp.body)
          var re = /"?(.+?)"*\s*"*</i
          self.mail = resp.body.map((mail) => {
            return {
              date: moment(mail.timestamp).format('MM-DD'),
              from: re.exec(mail.from)[1],
              subject: mail.subject
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
    align-self: flex-start;
  }
  #ev-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #eventline {
    margin: 0px;
    font-size: 10px
  }
  #mail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .goright {
    align-self: flex-start;
  }
  h1 {
    margin: 0px;
  }
  p {
    margin: 0px;
  }
</style>
