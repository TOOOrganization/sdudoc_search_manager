<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <BreadCrumb></BreadCrumb>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              href=""
              target="_blank"
              text
              v-bind="attrs"
              v-on="on"
          >
            <span class="mr-2" v-if="!$route.meta.notShowNav">欢迎 {{$store.state.user.nickname}}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="logout"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
        v-if="!$route.meta.notShowNav"
        app
    >
      <Aside v-if="!$route.meta.notShowNav"></Aside>
    </v-navigation-drawer>
    <v-main app>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BreadCrumb from './components/BreadCrumb.vue'
import Aside from "./components/Aside";

export default {
  name: 'app',
  components: {
    Aside,
    BreadCrumb
  },
  data: () => ({
    items: [
      { title: 'Log Out' },
    ],
  }),
  methods:{
    logout(){
      this.$store.commit('logout')
      this.$router.push('/Login')
      // this.$axios.defaults.headers = null
      this.$message({
        showClose: true,
        message: '已登出'
      });
    }
  }
}
</script>

<style>
</style>
