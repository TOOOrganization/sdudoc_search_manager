<template>
  <v-container>
    <v-row>
      <v-col
          :cols="2"
      >
        <v-form v-model="valid">
          <v-text-field
              v-model="defaultField"
              label="查询字段"
          ></v-text-field>
          <v-text-field
              v-model="query"
              label="查询内容"
          ></v-text-field>
          <v-text-field
              v-model="sort"
              label="排序"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="start"
                  label="start"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  v-model="rows"
                  label="rows"
              ></v-text-field>
            </v-col>
          </v-row>
<!--          <v-checkbox-->
<!--              v-model="checkbox1"-->
<!--              label="未审核"-->
<!--          ></v-checkbox>-->
<!--          <v-checkbox-->
<!--              v-model="checkbox2"-->
<!--              label="未标价"-->
<!--          ></v-checkbox>-->
          <v-col>
            <v-btn
                class="mr-4"
                @click="submit(start)"
                color="primary"
            >
              Execute Query
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

    <v-row justify="center">
      <v-dialog
          v-model="deleteOneDialog"
          persistent
          max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            删除确认
          </v-card-title>
          <v-card-text>您确认要删除_id为{{deleteOne.row._id}}的文章吗？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="deleteOneDialog = false"
            >
              取消
            </v-btn>
            <v-btn
                color="red"
                text
                @click="deleteOneDialog = false; deleteARow(deleteOne.index, deleteOne.row)"
            >
              删除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SolrArticle",
  data: () => ({
    valid: false,

    loading: false,

    defaultField: '',
    query:'',
    sort:'',
    start:0,
    rows:10,
    checkbox1: false,
    checkbox2: false,

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

    deleteOneDialog: false,
    deleteOne: {
      index: '',
      row:'',
    },
    deleteMutiDialog: false,
    selectedArticle:[],
  }),
  mounted() {
    this.out()
  },
  methods: {
    out(){
      console.log(this.$store.state.user)
      console.log(this.$axios.defaults.headers)
    },
    async submit () {
      this.loading = true
      await this.getSolrData('dms_article', this.defaultField, this.query, this.sort, this.start, this.rows).then(result =>{
        console.log(result)
        this.numFound = result.numFound
        this.articles = result.results
        this.returnNumber = result.results.length
      })
      this.loading = false
    },
    //当前页改变时触发 跳转其他页
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
      await this.deleteRow('dms_article', row).then(result =>{
        console.log(result)
        if (result === 'success')
          this.articles.splice(index, 1)
      })

    },
    deleteOneMethod (arr, strs) {
      for (let i=0; i<strs.length;i++){
        arr.splice(arr.indexOf(strs[i]), 1)
      }
      this.articles = arr
    },
    deleteSelected () {
      let _idList = []
      for (let i=0; i<this.selectedArticle.length; i++){
        _idList.push(this.selectedArticle[i]._id)
      }
      this.$confirm('此操作将永久删除这'+_idList.length+'个文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMany('dms_article', _idList).then(result =>{
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
    handleSelectionChange (val) {
      this.selectedArticle = val
      console.log(this.selectedArticle)
    },
    async check () {
      let solr = []
      let mongo = []
      await this.getSolrData('dms_article', '', '', '', '','','_id').then(result =>{
        for (let i=0; i<result.results.length; i++)
          solr.push(result.results[i]._id)
      })

      await this.findAll_id('article').then(result =>{
        mongo = result
      })
      console.log('solr',solr)
      console.log('mongo',mongo)
      //差集
      let difference = solr.concat(mongo).filter(v => solr.includes(v) && !mongo.includes(v))
      console.log('difference', difference)

      let query = ''
      if (difference.length !==0)
        for (let i=0;i<difference.length;i++){
          query += difference[i]+' '
        }
      else
        query = 'default'

      await this.getSolrData('dms_article', '_id', query, '', '', '','').then(result =>{
        console.log(result)
        this.numFound = result.numFound
        this.articles = result.results
        this.returnNumber = result.results.length
      })

    }
  },

}
</script>

<style scoped>

</style>