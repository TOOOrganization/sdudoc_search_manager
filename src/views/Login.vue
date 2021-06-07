<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="344"
    >
      <v-card-title>
        <span class="text-h5">Login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="loginForm.username"
                  label="Username"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="loginForm.password"
                  label="Password"
                  type="password"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
            text
            color="blue darken-1"
            @click="toLogin"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    loginForm:{
      username:'',
      password:''
    }
  }),
  created() {
    this.out()
  },
  methods:{
    out(){
      console.log(this.$axios.defaults.headers)
    },
    async toLogin(){
      let that = this
      console.log('username', this.loginForm.username)
      console.log('password', this.loginForm.password)
      console.log(this.$axios.defaults.headers)
      await this.login(this.loginForm.username, this.loginForm.password).then(result => {
        if (result.code === 200){
          that.$store.commit('login', JSON.parse(result.data))
          this.$router.push('/')
        }
      })

    }
  }
}
</script>

<style scoped>

</style>