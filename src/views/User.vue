<template>
  <v-container>
    <v-row>
      <v-col
          :cols="10"
      >
        <el-table
            :data="users.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            v-loading="loading"
        >
          <el-table-column
              v-for="item in headers"
              :key="item.label"
              :prop=item.prop
              :label=item.label
              :show-overflow-tooltip="true"
          >
          </el-table-column>

        </el-table>
        <el-pagination align='center'
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-size="10"
                       layout="total, prev, pager, next, jumper"
                       :total="returnNumber">
        </el-pagination>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "User",
  data: () => ({
    valid: false,
    loading:false,

    headers: [
      { prop: 'uid', label:'uid', },
      { prop: 'username', label: 'username' },
      { prop: 'password', label: 'password' },
      { prop: 'nickname', label: 'nickname' },
      { prop: 'email', label: 'email' },
      { prop: 'phone', label: 'phone' },
    ],
    users: [],
    returnNumber: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,
  }),
  mounted() {
    this.submit()
  },
  methods: {
    async submit (){
      await this.findAll('user').then(result =>{
        this.users = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  }
}
</script>

<style scoped>

</style>