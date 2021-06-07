<template>
  <v-container>
    <v-row>
      <v-col
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
              :fixed="item.fixed"
              :width="item.width"
              :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="operating" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  @click="showChangeRole(scope.$index, scope.row)">修改角色</el-button>
              <el-button
                  size="mini"
                  type="text"
                  style="color: red"
                  @click="showDeleteDialog(scope.row)">删除</el-button>
            </template>
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
    <v-btn
        class="mx-2"
        fab
        dark
        small
        color="primary"
        @click="addUserDialog = true"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

    <v-dialog
        v-model="changeRoleDialog"
        scrollable
        max-width="350"
    >
      <v-card>
        <v-card-title class="text-h5">修改角色</v-card-title>
        <v-card-text style="margin-top: 10px">
          <div>用户
            <span style="color: #3F51B5">{{changeRoleItem.user.nickname}}</span>
            当前的角色为：
            <br>
            <span style="color: red" v-for="item in changeRoleItem.role" :key="item.rid">
              {{item.role_description}}
              <br>
            </span>
            修改为：<br>
            <v-select
                v-model="roleSelect"
                :items="roleFields"
                item-text="description"
                item-value="rid"
                label="Select Role"
                single-line
            ></v-select>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="changeRoleDialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="setRole"
          >
            Save
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>
    <v-dialog
        v-model="addUserDialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="userForm.username"
                    label="Username*"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="userForm.password"
                    label="Password*"
                    type="password"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="userForm.confirmPassword"
                    label="ConfirmPassword*"
                    type="password"
                    hint="两次输入密码需要相同"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="userForm.nickname"
                    label="NickName*"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="userForm.email"
                    label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    v-model="userForm.phone"
                    label="Phone"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
              >
                <v-select
                    v-model="userForm.sex"
                    :items="sex"
                    item-text="msg"
                    item-value="id"
                    label="Sex"
                ></v-select>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
              >
                <v-select
                    v-model="Data.year"
                    :items="year"
                    label="Year"
                    @change="getDay"
                ></v-select>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
              >
                <v-select
                    v-model="Data.month"
                    :items="month"
                    label="Month"
                    @change="getDay"
                ></v-select>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
              >
                <v-select
                    v-model="Data.day"
                    :items="day"
                    label="Day"
                ></v-select>
              </v-col>
              <v-col
                  cols="12"
                  sm="7"
              >
                <v-select
                    v-model="userForm.role"
                    :items="roleFields"
                    item-text="description"
                    item-value="rid"
                    label="Role"
                    single-line
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="addUserDialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="addUser"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="deleteDialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          删除确认
        </v-card-title>
        <v-card-text>是否要删除用户名为：{{deleteItem.username}} 的用户？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="deleteDialog = false"
          >
            Disagree
          </v-btn>
          <v-btn
              color="red"
              text
              @click="deleteUser"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

export default {
  name: "Ds1UmsUser",
  data: () => ({
    valid: false,
    loading: false,

    changeRoleDialog: false,
    changeRoleItem: {
      user: {
        nickname:'',
      }
    },
    roleSelect: '',
    roleFields:[{
      rid:'',
      parentRid:'',
      name:'',
      description:'',
      createTime:''
    }],
    selectedUid: '',

    addUserDialog: false,
    selectedSex:'',
    sex:[ {id:0, msg:'男'}, {id:1, msg:'女'}],
    year:[],
    month:[],
    day:[],
    Data:{
      year: '',
      month: '',
      day: ''
    },
    userForm:{
      username:'',
      password:'',
      confirmPassword:'',
      nickname:'',
      email:'',
      phone:'',
      sex:'',
      birthday:'',
      role:''
    },

    deleteDialog: false,
    deleteItem:'',

    headers: [
      { prop: 'uid', label:'uid', width: 50 , fixed:'left'},
      { prop: 'username', label: 'username', width: 100 , fixed:'left'},
      { prop: 'password', label: 'password', width: 150 },
      { prop: 'sex', label: 'sex', width: 50 },
      { prop: 'birthday', label: 'birthday', width:150 },
      { prop: 'nickname', label: 'nickname', width:150 },
      { prop: 'email', label: 'email', width:200 },
      { prop: 'phone', label: 'phone', width:120 },
      { prop: 'role', label: 'role', width:200 },
      { prop: 'right', label: 'right', width:200 },
    ],
    queryResults: [],
    users: [],
    returnNumber: 0,
    numFound: 0,
    currentPage: 1,
    pageSize: 10,
  }),
  mounted() {
    this.submit()
    this.getRoles()
    this.getYear()
    this.getMonth()
    this.getDay()
  },
  methods: {
    async submit (){
      this.loading = true
      this.users = []
      await this.findAll('ds1_user').then(result => {
        this.queryResults = result

        for (let i=0; i<result.length; i++){
          this.users.push(result[i].user)

          switch (result[i].user.sex) {
            case 0 :
              this.users[i].sex = '男'
              break
            case 1 :
              this.users[i].sex = '女'
              break
          }

          this.users[i].role = ''
          for (let j=0; j<result[i].role.length; j++){
            if (result[i].role[j].role_description !== null)
              this.users[i].role += result[i].role[j].role_description + ';'
          }
          this.users[i].role = this.users[i].role.slice(0,-1)
          if (this.users[i].role === 'undefined')
            this.users[i].role = ''

          this.users[i].right = ''
          for (let j=0; j<result[i].right.length; j++){
            for (let k=0; k<result[i].right[j].length; k++){
              if (result[i].right[j][k].right_description !== null)
                this.users[i].right += result[i].right[j][k].right_description + ';'
            }
          }
          this.users[i].right = this.users[i].role.slice(0,-1)
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
    showChangeRole(index, row){
      console.log(index)
      console.log(this.queryResults[index])
      this.changeRoleItem = this.queryResults[index]
      this.selectedUid = row.uid
      this.changeRoleDialog = true
    },
    async getRoles(){
      await this.findAll('ds1_role').then(result => {
        console.log(result)
        this.roleFields = result
      })
    },
    async setRole(){
      console.log(this.roleSelect)
      console.log(this.selectedUid)
      let refresh = false
      await this.updateUserRole(this.selectedUid, this.roleSelect, 'ds1').then(result =>{
        console.log(result)
        if (result){
          this.changeRoleDialog = false
          refresh = true
        }
      })
      if (refresh){
        await this.submit()
        console.log(this.users)
        refresh = false
      }
    },
    getYear(){//获取年
      let date = new Date;
      let current_year = date.getFullYear();
      for (let i = 0; i < 100; i++) {
        let y = current_year - i;
        this.year.push(y);
      }
    },
    getMonth(){//获取月
      for (let i = 1; i < 13; i++) {
        this.month.push(i);
      }
    },
    getDay(){//获取日
      this.day = [];
      let day = this.getDaysInMonth(this.Data.year, this.Data.month)
      for (let i = 1; i <= day ; i++) {
        this.day.push(i);
      }
    },
    getDaysInMonth(year, month) {//获取某个月的天数
      month = parseInt(month, 10);
      let d = new Date(year, month, 0);
      return d.getDate();
    },
    async addUser(){
      if (this.Data.year !== '' && this.Data.month !== '' && this.Data.day)
        this.userForm.birthday = this.Data.year+'-'+this.Data.month+'-'+this.Data.day
      console.log(this.userForm)
      await this.addOneUser(this.userForm, 'ds1').then(result => {
        console.log(result)
        if (result.code === 200){
          this.$message({
            showClose: true,
            message: 'user添加成功',
            type: 'success'
          });
          this.addUserDialog = false
          this.submit()
        }else if (result.code === 500){
          this.$message({
            showClose: true,
            message: result.message,
            type: 'error'
          });
        }
      })
    },
    showDeleteDialog(row){
      this.deleteDialog = true
      this.deleteItem = row
    },
    async deleteUser(){
      await this.deleteOneUser(this.deleteItem.uid, 'ds1')
      await this.submit()
      this.deleteDialog = false
    }
  }
}
</script>

<style scoped>

</style>