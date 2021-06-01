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
          <el-table-column label="选项">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="danger"
                  @click="deleteOneDialogShow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <v-row justify="center" style="margin-top: 20px" v-if="articles.length !==0">
          <v-col>
            <el-button type="danger" @click="deleteSelected()" >删除选中</el-button>
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
  name: "DmsArticle",
  data: () => ({
    valid: false,
    loading:false,

    select:'',
    fields: ['_id', 'title', 'articleAuthor', 'bookname', 'dynasty', 'content'],
    query: '',

    headers: [
      { prop: '_id', label:'_id', },
      { prop: 'title', label: 'title' },
      { prop: 'articleAuthor', label: 'articleAuthor' },
      { prop: 'dynasty', label: 'dynasty' },
      { prop: 'bookname', label: 'bookname' },
      { prop: 'content', label: 'content' },
      { prop: 'page', label: 'page' },
    ],
    articles: [],
    returnNumber: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,

    selectedArticle:[],
  }),
  methods: {
    async submit (){
      await this.find('article', this.select, this.query).then(result =>{
        this.articles = result
        for (let i=0; i<result.length; i++){
          this.articles[i].page = JSON.stringify(result[i].page)
        }
        this.numFound = result.length
        this.returnNumber = result.length
      })
    },
    async findAll_ () {
      this.loading = true
      await this.findAll('article').then(result =>{
        console.log(result)
        this.articles = result
        for (let i=0; i<result.length; i++){
          this.articles[i].page = JSON.stringify(result[i].page)
        }
        this.numFound = result.length
        this.returnNumber = result.length
      })
      this.loading = false
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    deleteOneDialogShow (index, row) {
      this.deleteOneDialog = true
      this.deleteOne.index = index
      this.deleteOne.row = row
    },
    async deleteARow(index, row){
      console.log(index)
      console.log(row.id)
      await this.deleteRowMongo('article', row).then(result =>{
        console.log(result)
        if (result === 'success')
          this.articles.splice(index, 1)
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
      let list = JSON.parse(JSON.stringify(this.selectedArticle))
      for (let i=0; i < list.length; i++){
        list[i].page = JSON.parse(list[i].page)
      }
      this.$confirm('此操作将永久删除这'+list.length+'个文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteManyMongo('article', list).then(result =>{
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
    async check () {
      let mongo = []
      let solr = []

      await this.findAll_id('article').then(result =>{
        mongo = result
      })

      await this.getSolrData('dms_article', '', '', '', '','','_id').then(result =>{
        for (let i=0; i<result.results.length; i++)
          solr.push(result.results[i]._id)
      })
      console.log('mongo',mongo)
      console.log('solr',solr)

      //差集
      let difference = mongo.concat(solr).filter(v => mongo.includes(v) && !solr.includes(v))
      console.log('difference', difference)

      await this.findMany('article', '_id', difference).then(result =>{
        console.log(result)
        this.articles = result
        for (let i=0; i<result.length; i++){
          this.articles[i].page = JSON.stringify(result[i].page)
        }
        this.numFound = result.length
        this.returnNumber = result.length
      })

    }
  }
}
</script>

<style scoped>

</style>