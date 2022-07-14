<template>
  <div>
    <el-card>
      <div class="search">
        <Search
          label="用户名"
          @search="search"
          v-model="queryModel.username"
        ></Search>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="
            model = {
              username: '',
              password: '',
              avatar:
                'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
              email: '',
              status: ''
            }
            dialogFormVisible = true
          "
          >新增</el-button
        >
      </div>

      <Table :data="list" :cols="cols">
        <template v-slot:avatar="{ row }">
          <el-avatar size="50" :src="row.avatar"></el-avatar>
        </template>
        <template v-slot:roles="{ row }">
          <el-tag v-for="item in row.roles" :key="item.id">
            {{ item.name }}</el-tag
          >
        </template>
        <template v-slot:action="{ row }">
          <el-button
            plain
            size="mini"
            type="success"
            @click="
              model = { ...row }
              dialogFormVisible = true
            "
            >编辑</el-button
          >
          <el-button plain size="mini" type="warning" @click="handleRole(row)">
            分配角色</el-button
          >
          <el-popconfirm
            style="margin-left: 10px"
            title="确定删除嘛"
            @confirm="handleUserDel(row)"
          >
            <el-button slot="reference" plain size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
        <template v-slot:status="{ row: { status } }">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            :value="status"
            active-color="#13ce66"
            inactive-color="#FF4949"
          ></el-switch>
        </template>
      </Table>
      <div class="foot">
        <div></div>
        <pagination
          :value="queryModel"
          @change="change"
          :total="total"
        ></pagination>
      </div>
    </el-card>
    <!-- Dialog -->
    <el-dialog
      :title="title"
      width="400px"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="model"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="avatar">
          <el-avatar :size="70" :src="model.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="model.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="success" v-on:click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配角色" width="400px" center :visible.sync="visible">
      <el-form
        :model="model"
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="username">
          <el-select v-model="integers" multiple style="width: 100%">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="visible = false">取消</el-button>
          <el-button type="success" v-on:click="handleEditRole">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Search from '../../components/Search.vue'
import loginApi from '../../api/login'
import Table from '../../components/Table.vue'
import cols from './cols'
import Pagination from '../../components/Pagination.vue'
export default {
  components: {
    Table,
    Search,
    Pagination
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        status: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      model: {
        username: '',
        password: '',
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
        email: '',
        status: ''
      },
      cols,
      queryModel: {
        current: 1,
        size: 5,
        username: ''
      },
      list: [],
      total: 0,
      integers: [],
      roleList: [],
      visible: false
    }
  },
  created() {
    this.getUserLists()
  },
  methods: {
    async handleEditRole() {
      this.visible = true
      console.log(this.model)
      console.log(this.integers)
      try {
        const res = await loginApi.roleApi(this.model.id, this.integers)
        console.log(res)
        this.$notify({
          title: '提示',
          message: `请求成功`,
          type: 'success'
        })
        this.visible = false
        this.getUserLists()
      } catch (e) {
        console.log(e)
      }
    },
    async handleUserDel(row) {
      try {
        console.log(row)
        const res = await loginApi.userDelApi(row.id)
        console.log(res)
      } catch (error) {}
    },
    // 分配角色
    async handleRole(row) {
      console.log(row)
      this.model = { ...row }
      try {
        this.visible = true
        const res = await loginApi.roleListAPI()
        this.roleList = res.records
        const result = []
        res.records.forEach((i) => {
          result.push(
            ...row.roles.filter((item) => {
              return item.id === i.id
            })
          )
        })
        this.integers = result.map((v) => v.id)
      } catch (error) {}
    },
    async submitForm() {
      // const from = this.$refs.ruleForm
      try {
        ;(await this.model.id)
          ? loginApi.updateUserApi(this.model)
          : loginApi.addUserApi(this.model)
        this.getUserLists()
        this.dialogFormVisible = false
        this.getUserLists()
        this.$notify({
          title: '提示',
          message: `${this.model.id ? '编辑' : '新增'}成功`,
          type: 'success'
        })
      } catch (error) {
        this.getUserLists()
      }
    },
    // 分配角色

    search() {
      this.queryModel.current = 1
      this.getUserLists()
    },
    async getUserLists() {
      try {
        const res = await loginApi.getUserList(this.queryModel)
        this.list = res.records
        this.total = res.total
      } catch (error) {}
    },
    change(obj) {
      this.queryModel = obj
      this.getUserLists()
    }
  },
  computed: {
    title() {
      return this.model.id ? '编辑用户' : '新增用户'
    }
  }
}
</script>
<style scoped>
.foot {
  display: flex;
  justify-content: space-between;
}
.search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.el-card {
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}
</style>
