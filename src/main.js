import Vue from 'vue'
import App from './App.vue'
import Calendar from './Calendar.vue'

Vue.component("calendar", Calendar);

new Vue({
  el: '#app',
  render: h => h(App)
})
