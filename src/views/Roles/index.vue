<template>
  <div>
    <el-card>
      <div class="seare">
        <search
          v-model="queryModel.name"
          @search="search"
          label="角色"
        ></search>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="
            dialogFormVisible = true
            model = {}
          "
          >新增</el-button
        >
      </div>
      <Table :data="roleList" :cols="cols">
        <template v-slot:status="{ row: { status } }">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            :value="status"
            active-color="#13ce66"
          ></el-switch>
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
          <el-button
            plain
            size="mini"
            type="warning"
            @click="handleEditRole(row)"
            >分配权限</el-button
          >
          <el-button plain size="mini" @click="delRole(row)" type="danger"
            >删除</el-button
          >
        </template>
      </Table>
      <pagination
        :total="total"
        v-model="queryModel"
        @change="change"
      ></pagination>

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
          <el-form-item label="角色" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model="model.code"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="model.remark"></el-input>
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

      <!-- ---------- -->
      <el-dialog :title="dgTitle" width="400px" center :visible.sync="visible">
        <el-tree
          :data="treeData"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
          default-expand-all
          node-key="id"
          show-checkbox
          @check="handleCheckChange"
        ></el-tree>
        <div class="cen">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="success" v-on:click="handleRoleCheck"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import Search from '../../components/Search.vue'
import Table from '../../components/Table.vue'
import Pagination from '../../components/Pagination.vue'
import cols from './cols'
import {
  roleListAPI,
  roleAddApi,
  roleEditAPI,
  roleInfoAPI,
  rolePermAPI,
  MenuNav
} from '../../api/role'
export default {
  components: {
    Table,
    Search,
    Pagination
  },
  data() {
    return {
      visible: false,
      dgTitle: '',
      treeData: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogFormVisible: false,
      model: {
        code: '',
        name: '',
        remark: '',
        status: ''
      },
      cols,
      queryModel: {
        current: 1,
        size: 5,
        name: ''
      },
      total: 0,
      roleList: [],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        remark: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async handleRoleCheck() {
      try {
        await rolePermAPI(this.model.id, this.checkedKeys)
        this.$notify({
          title: '提示',
          message: '请求成功',
          type: 'success'
        })
        this.visible = false
        this.getRoleList()
      } catch (e) {
        console.log(e)
      }
    },
    handleCheckChange(data, { checkedKeys }) {
      this.checkedKeys = checkedKeys
    },
    async getTree() {
      try {
        const { menus } = await MenuNav()
        this.treeData = menus
        console.log(this.treeData, 'data')
      } catch (e) {
        console.log(e)
      }
    },
    async handleEditRole(row) {
      try {
        this.model = { ...row }
        this.checkedKeys = []
        await this.getTree()
        this.dgTitle = `给${row.name}分配角色`
        const { menuIds } = await roleInfoAPI(row.id)
        this.checkedKeys = menuIds
        console.log(this.checkedKeys)
        this.visible = true
      } catch (error) {}
    },
    async submitForm() {
      try {
        const res = (await this.model.id)
          ? roleEditAPI(this.model)
          : roleAddApi(this.model)
        // this.getRoleList()
        this.dialogFormVisible = false
        this.$notify({
          title: '提示',
          message: `请求成功`,
          type: 'success'
        })
        this.getRoleList()
        console.log(res, 'res')
      } catch (error) {}
    },
    async getRoleList() {
      try {
        const { records, total } = await roleListAPI(this.queryModel)
        this.roleList = records
        console.log(this.roleList)
        this.total = total
      } catch (e) {
        console.log(e)
      }
    },
    search() {
      this.queryModel.current = 1
      this.getRoleList()
    },
    change(obj) {
      this.queryModel = obj
      this.getRoleList()
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
.cen {
  width: 100%;
  text-align: center;
}
.seare {
  display: flex;
  justify-content: space-between;
}
</style>
