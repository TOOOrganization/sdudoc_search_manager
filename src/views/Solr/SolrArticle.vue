<template>
  <v-container>
    <v-row>
      <v-col
          :cols="2"
      >
        <v-form v-model="valid">
          <v-text-field
              v-model="defaultfield"
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
          <v-checkbox
              v-model="checkbox1"
              label="未审核"
          ></v-checkbox>
          <v-checkbox
              v-model="checkbox2"
              label="未标价"
          ></v-checkbox>
          <v-btn
              class="mr-4"
              @click="submit"
              color="primary"
          >
            Execute Query
          </v-btn>
        </v-form>
      </v-col>
      <v-col
          :cols="10"
      >
        <el-table
            :data="articles.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                       :total="returnArticles">
        </el-pagination>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import qs from "qs";
export default {
  name: "SolrArticle",
  data: () => ({
    valid: false,
    defaultfield: '',
    query:'',
    sort:'',
    start:0,
    rows:10,
    checkbox1: false,
    checkbox2: false,
    // headers: [
    //   {
    //     text: '_id',
    //     align: 'start',
    //     value: '_id',
    //   },
    //   { text: 'Title', value: 'title' },
    //   { text: 'ArticleAuthor', value: 'articleAuthor' },
    //   { text: 'Dynasty', value: 'dynasty' },
    //   { text: 'BookName', value: 'bookname' },
    //   { text: 'Content', value: 'content' },
    //   { text: 'Page', value: 'page' },
    // ],
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
    returnArticles: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,
  }),
  methods: {
    submit () {
      this.$axios.post('/solr/query',
      qs.stringify({
        coreName:'dms_article',
        defaultField:this.defaultfield,
        query:this.query,
        sort:this.sort,
        start:this.start,
        rows:this.rows
      })
      ).then(resp => {
        if (resp) {
          console.log(resp.data)
          this.articles = resp.data.results
          this.numFound = resp.data.numFound
          this.returnArticles = resp.data.results.length
          console.log(this.articles)
        }
      })
          .catch(failResponse => {
            console.log(failResponse)
          })
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  },
}
</script>

<style scoped>

</style>