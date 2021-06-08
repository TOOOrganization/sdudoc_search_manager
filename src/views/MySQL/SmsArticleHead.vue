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

          <v-col>
            <v-btn
                class="mr-4"
                @click="check()"
                color="primary"
            >
              check
            </v-btn>
          </v-col>

        </v-form>
      </v-col>
      <v-col
          :cols="10"
      >
        <el-table
            ref="multipleTable"
            :data="articles.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            @selection-change="handleSelectionChange"
            v-loading="loading"
        >
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              v-for="item in headers"
              :key="item.label"
              :prop=item.prop
              :label=item.label
              :show-overflow-tooltip="true"
          >
          </el-table-column>

        </el-table>
        <v-row justify="center" style="margin-top: 20px" v-if="articles.length !==0">
          <v-col>
            <el-button type="danger" @click="deleteSelected()" >删除选中</el-button>
            <el-button type="danger" v-if="diff" @click="deleteAll()" >全部删除</el-button>
          </v-col>

          <v-col>
            <el-pagination align='center'
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-size="10"
                           layout="total, prev, pager, next, jumper"
                           :total="returnNumber">
            </el-pagination>
          </v-col>

        </v-row>

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
      { prop: 'articleauthor', label: 'articleAuthor' },
      { prop: 'dynasty', label: 'dynasty' },
      { prop: 'bookname', label: 'bookname' },
    ],
    articles: [],
    returnNumber: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,

    selectedArticle: [],
    diff: false,
  }),
  methods: {
    async submit (){
      await this.find('article_head', this.select, this.query).then(result =>{
        result = JSON.parse(result.data)
        this.articles = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
    },
    async findAll_ () {
      this.loading = true
      await this.findAll('article_head').then(result =>{
        let transResult = JSON.parse(result.data)
        console.log(transResult)
        this.articles = transResult
        this.numFound = transResult.length
        this.returnNumber = transResult.length
      })
      this.loading = false
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    async check () {
      this.diff = true
      let article_head = []
      let article = []
      await this.findAll('article_head').then(result =>{
        let transResult = JSON.parse(result.data)
        for (let i=0; i<transResult.length; i++)
          article_head.push(transResult[i].aid)
      })

      await this.findAll_id('article').then(result =>{
        article = result
      })

      console.log('article_head', article_head)
      console.log('article', article)

      let difference = article_head.concat(article).filter(v => article_head.includes(v) && !article.includes(v))
      console.log('difference', difference)
      this.diff_character = difference

      await this.findMany('article_head', 'aid', difference).then(result =>{
        result = JSON.parse(result.data)
        this.articles = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
    },
    handleSelectionChange (val) {
      this.selectedArticle = val
      console.log(this.selectedArticle)
    },
    deleteOneMethod (arr, strs) {
      for (let i=0; i<strs.length;i++){
        arr.splice(arr.indexOf(strs[i]), 1)
      }
      this.articles = arr
    },
    deleteSelected () {
      let list = this.selectedArticle
      this.$confirm('此操作将永久删除这'+list.length+'篇文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteManyMongo('article_head', list).then(result =>{
          console.log(result)
          if (result === 'success')
            this.deleteOneMethod(this.articles, this.selectedArticle)
        })
      }).catch((failResponse) => {
        console.log(failResponse)
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async deleteAll () {
      let list = this.articles
      this.$confirm('此操作将永久删除这'+list.length+'篇文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteManyMongo('article_head', list).then(result =>{
          console.log(result)
          if (result === 'success')
            this.articles = []
        })
      }).catch((failResponse) => {
        console.log(failResponse)
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>