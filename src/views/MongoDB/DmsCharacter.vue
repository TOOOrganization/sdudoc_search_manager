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
            :data="characters.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
        <v-row justify="center" style="margin-top: 20px" v-if="characters.length !==0">
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
  name: "DmsCharacter",
  data: () => ({
    valid: false,
    loading:false,

    select:'',
    fields: ['_id', 'character', 'article', 'page', 'position'],
    query: '',

    headers: [
      { prop: '_id', label:'_id', },
      { prop: 'character', label: 'character' },
      { prop: 'article', label: 'article' },
      { prop: 'page', label: 'page' },
      { prop: 'position', label: 'position' },
    ],
    characters: [],
    returnNumber: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,
  }),
  methods: {
    async submit (){
      await this.find('character', this.select, this.query).then(result =>{
        this.characters = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
    },
    async findAll_ () {
      this.loading = true
      await this.findAll('character').then(result =>{
        console.log(result)
        this.characters = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
      this.loading = false
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    async check () {
      let character = []
      let article = []
      await this.findAllArticle('character').then(result =>{
        character = result
      })

      await this.getSolrData('dms_article', '', '', '', '','','_id').then(result =>{
        for (let i=0; i<result.results.length; i++)
          article.push(result.results[i]._id)
      })

      console.log('character', character)
      console.log('article', article)

      let difference = character.concat(article).filter(v => character.includes(v) && !article.includes(v))
      console.log('difference', difference)
      this.diff_character = difference

      await this.findMany('character', 'article', difference).then(result =>{
        this.characters = result
        this.numFound = result.length
        this.returnNumber = result.length
      })
    },
    handleSelectionChange (val) {
      this.selectedCharacter = val
      console.log(this.selectedCharacter)
    },
  }
}
</script>

<style scoped>

</style>