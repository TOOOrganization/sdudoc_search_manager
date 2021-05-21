import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import qs from 'qs'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.qs=qs

Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:8081'
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
