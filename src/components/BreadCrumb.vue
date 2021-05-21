<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item>
          {{ item }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    name: 'BreadCrumb',
    data:()=> ({
      levelList: [],
      items: [],
    }),
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created(){
      this.getBreadcrumb()
    },
    methods:{
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0];
        if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
          matched = [].concat(matched)
        }
        this.levelList = matched
        let router = this.levelList[0].path.split('/').slice(1)
        this.items=router
      }
    }
  }
</script>

