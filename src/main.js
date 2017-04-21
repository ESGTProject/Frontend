// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'

import VueYouTubeEmbed from 'vue-youtube-embed'
var VueResource = require('vue-resource')
var VueFire = require('vuefire')
var VueCharts = require('vue-charts/dist/vue-charts.js')

Vue.use(VueResource)
Vue.use(VueFire)
Vue.use(VueCharts)
Vue.use(VueYouTubeEmbed)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
