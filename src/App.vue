<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <BreadCrumb></BreadCrumb>

      <v-spacer></v-spacer>

      <v-btn
          href=""
          target="_blank"
          text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>Learn More</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        app
    >
      <Aside></Aside>
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
    //
  }),
}
</script>

<style>
</style>
