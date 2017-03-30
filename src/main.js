// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'

var VueResource = require('vue-resource')
var VueCharts = require('vue-charts/dist/vue-charts.js')
var VueFire = require('vuefire')

Vue.use(VueFire)
Vue.use(VueResource)
Vue.use(VueCharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
