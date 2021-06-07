<template>
  <v-container>
    <v-row>
      <v-col
          :cols="10"
      >
        <el-table
            :data="rights.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
  name: "Ds2UmsRight",
  data: () => ({
    valid: false,
    loading:false,

    headers: [
      { prop: 'rightId', label:'rightId', },
      { prop: 'parentRightId', label: 'parentRightId' },
      { prop: 'name', label: 'name' },
      { prop: 'description', label: 'description' }
    ],
    rights: [],
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
      this.loading = true
      await this.findAll('ds2_right').then(result =>{
        this.rights = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
      this.loading = false
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