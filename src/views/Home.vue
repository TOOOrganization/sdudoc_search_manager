<template>
  <div>
<!--    <h1>Home</h1>-->
    <v-col>
      <v-btn
          class="mr-4"
          @click="submit"
          color="primary"
      >
        Execute Query
      </v-btn>
    </v-col>
  </div>
</template>

<script>

import qs from "qs";
  export default {
    name: 'Home',
    data: () => ({
      data:[9,2]
    }),
    methods:{
      submit(){
        this.$axios.post('/solr/getPNGs',qs.stringify({
          pids: JSON.stringify(this.data)
            })
        ).then(resp => {
          if (resp) {
            console.log(resp.data)
          }
        })
            .catch(failResponse => {
              console.log(failResponse)
            })
      }
    },
    components: {
    },
  }
</script>
