<template>
  <v-container>
    <v-row>
      <v-col
          :cols="2"
      >
        <v-form v-model="valid">

          <v-select
              v-model="select"
              :items="fields"
              label="查询字段"
          ></v-select>

          <v-text-field
              v-model="query"
              label="查询内容"
          ></v-text-field>

          <v-col>
            <v-btn
                class="mr-4"
                @click="submit"
                color="primary"
            >
              Execute Query
            </v-btn>
          </v-col>

          <v-col>
            <v-btn
                class="mr-4"
                @click="findAll_"
                color="primary"
            >
              Find All
            </v-btn>
          </v-col>

        </v-form>
      </v-col>
      <v-col
          :cols="10"
      >
        <el-table
            :data="articles.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
  name: "SmsArticleHead",
  data: () => ({
    valid: false,
    loading:false,

    select:'',
    fields: ['aid', 'title', 'articleAuthor', 'bookname', 'dynasty'],
    query: '',

    headers: [
      { prop: 'aid', label:'aid', },
      { prop: 'title', label: 'title' },
      { prop: 'articleAuthor', label: 'articleAuthor' },
      { prop: 'dynasty', label: 'dynasty' },
      { prop: 'bookname', label: 'bookname' },
    ],
    articles: [],
    returnNumber: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,
  }),
  methods: {
    async submit (){
      await this.find('article_head', this.select, this.query).then(result =>{
        this.articles = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
    },
    async findAll_ () {
      this.loading = true
      await this.findAll('article_head').then(result =>{
        console.log(result)
        this.articles = result
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