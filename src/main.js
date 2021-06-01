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
axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$axios = axios

import {getSolrData} from "./api/request";
import {getSolrGroupData} from "./api/request";
import {findAll} from "./api/request";
import {findAll_id} from "./api/request";
import {findAllArticle} from "./api/request";
import {find} from "./api/request";
import {findMany} from "./api/request";
import {deleteRow} from "./api/request";
import {deleteMany} from "./api/request";
import {deleteRowMongo} from "./api/request";
import {deleteManyMongo} from "./api/request";
Vue.prototype.getSolrData = getSolrData
Vue.prototype.getSolrGroupData = getSolrGroupData
Vue.prototype.findAll = findAll
Vue.prototype.findAll_id = findAll_id
Vue.prototype.findAllArticle = findAllArticle
Vue.prototype.find = find
Vue.prototype.findMany = findMany
Vue.prototype.deleteRow = deleteRow
Vue.prototype.deleteMany = deleteMany
Vue.prototype.deleteRowMongo = deleteRowMongo
Vue.prototype.deleteManyMongo = deleteManyMongo

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
