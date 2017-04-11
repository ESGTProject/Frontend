<template lang="html">
  <div id="container">
    <h1>Calendar</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        events: [
          {
            title: 'One',
            start: '2017-04-01'
          },
          {
            title: 'Two',
            start: '2017-04-10'
          },
          {
            title: 'Three',
            start: '2017-04-15'
          },
          {
            title: 'Expo',
            start: '2017-04-25'
          }
        ]
      }
    },
    components: {
    }
  }
</script>

<style lang="css" scoped>
  #container {
    flex: auto;
    overflow: auto;
  }
</style>
