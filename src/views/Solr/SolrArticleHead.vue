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
import qs from "qs";

export default {
  name: "SolrArticleHead",
  data: () =>({
    valid: false,

    loading: false,

    defaultField: '',
    query:'',
    sort:'',
    start:0,
    rows:10,

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
  methods:{
    submit () {
      this.loading = true
      this.$axios.post('/solr/query',
          qs.stringify({
            coreName:'sms_article_head',
            defaultField:this.defaultField,
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
          this.returnNumber = resp.data.results.length
          console.log(this.articles)
          this.loading = false
        }
      })
          .catch(failResponse => {
            console.log(failResponse)
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