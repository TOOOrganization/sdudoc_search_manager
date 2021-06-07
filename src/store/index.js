import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
        uid:window.localStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.localStorage.getItem('user' || '[]')).uid,
        username:window.localStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
        nickname:window.localStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.localStorage.getItem('user' || '[]')).nickname,
        imgurl:window.localStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.localStorage.getItem('user' || '[]')).imgurl,
        loginTime:window.localStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.localStorage.getItem('user' || '[]')).loginTime,
        _count:window.localStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.localStorage.getItem('user' || '[]'))._count,
        status:window.localStorage.getItem('user' || '[]') == null ? null : JSON.parse(window.localStorage.getItem('user' || '[]')).status,
    },
    token:window.localStorage.getItem('token' || '[]') == null ? null : window.localStorage.getItem('token' || '[]'),
  },
  mutations: {
    login (state, data){
      state.user = data.user
      state.token = data.token
      window.localStorage.setItem('user', JSON.stringify(data.user))
      window.localStorage.setItem('token', data.token)
    },
    logout(state){
      state.user = 'null'
      state.token = 'null'
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('token')
    },
  },
  actions: {
  },
  modules: {
  }
})
