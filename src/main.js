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
// axios.defaults.baseURL = 'http:/'
Vue.prototype.$axios = axios

// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = window.localStorage.getItem("token")
    if (token) {
        config.headers.zmw = 'zmw' + token;    //将token放到请求头发送给服务器
        console.log(config.headers)
        //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
        // config.headers['accessToken'] = Token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

import {getSolrData} from "./api/article";
import {getSolrGroupData} from "./api/article";
import {findAll} from "./api/article";
import {findAll_id} from "./api/article";
import {findAllArticle} from "./api/article";
import {find} from "./api/article";
import {findMany} from "./api/article";
import {deleteRow} from "./api/article";
import {deleteMany} from "./api/article";
import {deleteRowMongo} from "./api/article";
import {deleteManyMongo} from "./api/article";
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

import {login} from "./api/login";
import {selectRoleForUser} from "./api/authority";
import {authorizeUser} from "./api/authority";
import {updateUserRole} from "./api/authority";
import {addOneUser} from "./api/authority";
import {deleteOneUser} from "./api/authority";
Vue.prototype.login = login
Vue.prototype.selectRoleForUser = selectRoleForUser
Vue.prototype.authorizeUser = authorizeUser
Vue.prototype.updateUserRole = updateUserRole
Vue.prototype.addOneUser = addOneUser
Vue.prototype.deleteOneUser = deleteOneUser

router.beforeEach((to, from, next) => {
      if (!to.meta.notRequireAuth) {
        if (store.state.user.username) {
          next()
        } else {
          next({
            path: '/Login',
            query: {redirect: to.fullPath}
          })
        }
      } else {
        next()
      }
    }
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
