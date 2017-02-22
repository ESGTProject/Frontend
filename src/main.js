// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize/dist/vue-resize'

// import router from './router'

var VueResource = require('vue-resource')
var VueCharts = require('vue-charts/dist/vue-charts.js')
Vue.use(VueResource)
Vue.use(VueCharts)
Vue.use(VueResize)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
