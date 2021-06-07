<template>
  <v-container>
    <v-row justify="center" align="center" style="margin-top: 10%; -webkit-user-select:none;">
      <v-col
          cols="12"
          class="text-center text-h2 mb-1"
      >
          欢迎
      </v-col>
      <v-col
          cols="12"
          class="text-center text-h5 mb-1"
      >
          您可以对以下模块进行操作
      </v-col>
      <v-col
        class="text-center"
      >
        <v-row>
          <v-col
              offset="3"
              md="2">
            <v-btn
                rounded
                color="primary"
                dark
                @click="toUser"
            >
              User
            </v-btn>
          </v-col>
          <v-col
              md="1">
            <v-btn
                rounded
                color="primary"
                dark
                @click="toMySQL"
            >
              mysql
            </v-btn>
          </v-col>
          <v-col md="2">
            <v-btn
                rounded
                color="primary"
                dark
                @click="toMongo"
            >
              mongo
            </v-btn>
          </v-col>
          <v-col md="1">
            <v-btn
                rounded
                color="primary"
                dark
                @click="toSolr"
            >
              solr
            </v-btn>
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import qs from "qs";
  export default {
    name: 'Home',
    data: () => ({
      data:[9,2]
    }),
    created() {
      this.out()
    },
    methods:{
      out(){
        console.log(this.$store.state.user)
        console.log(this.$axios.defaults.headers)
      },
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
      },
      toUser(){
        this.$router.push('/User/Editor/UmsUser')
      },
      toMySQL(){
        this.$router.push('/MySQL/SmsArticleHead')
      },
      toMongo(){
        this.$router.push('/MongoDB/DmsArticle')
      },
      toSolr(){
        this.$router.push('/Solr/SolrArticle')
      }
    },
    components: {
    },
  }
</script>
