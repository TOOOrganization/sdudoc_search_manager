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
            :data="words.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
        <v-row justify="center" style="margin-top: 20px" v-if="words.length !==0">
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
  name: "SolrWord",
  data: () =>({
    valid: false,

    loading: false,

    defaultField: '',
    query:'',
    sort:'',
    start:0,
    rows:10,

    headers: [
      { prop: '_id', label:'_id', },
      { prop: 'word', label: 'word' },
      { prop: 'article', label: 'article' },
      { prop: 'page', label: 'page' },
      { prop: 'position', label: 'position' },
    ],
    words: [],
    returnNumber: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,

    selectedWord: [],
    diff_word: [],
    diff: false
  }),
  methods:{
    async submit () {
      this.loading = true
      this.diff = false
      this.getSolrData('dms_word', this.defaultField, this.query, this.sort, this.start, this.rows).then(result =>{
        console.log(result)
        this.numFound = result.numFound
        this.words = result.results
        this.returnNumber = result.results.length
      })
      this.loading = false
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    async check () {
      this.diff = true
      let word = []
      let article = []
      await this.getSolrGroupData('dms_word', '', '', '', '','', 'article', 'article').then(result =>{
        word = result
      })

      await this.getSolrData('dms_article', '', '', '', '','','_id').then(result =>{
        for (let i=0; i<result.results.length; i++)
          article.push(result.results[i]._id)
      })

      console.log('word', word)
      console.log('article', article)

      let difference = word.concat(article).filter(v => word.includes(v) && !article.includes(v))
      console.log('difference', difference)
      this.diff_word = difference

      let query = ''
      if (difference.length !==0)
        for (let i=0;i<difference.length;i++){
          query += difference[i]+' '
        }
      else
        query = 'default'

      await this.getSolrData('dms_word', 'article', query, '', '', '','').then(result =>{
        console.log(result)
        this.numFound = result.numFound
        this.words = result.results
        this.returnNumber = result.results.length
      })
    },
    handleSelectionChange (val) {
      this.selectedWord = val
      console.log(this.selectedWord)
    },
    deleteOneMethod (arr, strs) {
      for (let i=0; i<strs.length;i++){
        arr.splice(arr.indexOf(strs[i]), 1)
      }
      this.words = arr
    },
    deleteSelected () {
      let _idList = []
      for (let i=0; i<this.selectedWord.length; i++){
        _idList.push(this.selectedWord[i]._id[0])
      }
      console.log(_idList)
      this.$confirm('此操作将永久删除这'+_idList.length+'个词, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMany('dms_word', _idList).then(result =>{
          console.log(result)
          if (result === 'success')
            this.deleteOneMethod(this.words, this.selectedWord)
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
      let _idList = []
      for (let i=0; i<this.words.length; i++){
        _idList.push(this.words[i]._id)
      }

      this.$confirm('此操作将永久删除这'+_idList.length+'个词, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMany('dms_word', _idList).then(result =>{
          console.log(result)
          if (result === 'success')
            this.words = []
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
