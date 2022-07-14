<template>
  <div>
    <el-card>
      <div class="seare">
        <search
          v-model="queryModel.username"
          @search="search"
          label="菜单"
        ></search>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="
            dialogFormVisible = true
            formModel = {
              children: [],
              component: '',
              icon: '',
              label: '',
              parentId: '',
              path: '',
              perms: '',
              status: '',
              type: ''
            }
          "
          >新增</el-button
        >
      </div>
      <Table
        :data="menuList"
        :cols="cols"
        :treeProps="{ children: 'children' }"
      >
        <template v-slot:type="{ row: { type } }">
          <el-tag :type="color[type]">{{ level[type] }}</el-tag>
        </template>
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
              formModel = { ...row }
              dialogFormVisible = true
            "
            >编辑</el-button
          >
          <el-button plain size="mini" type="danger">删除</el-button>
        </template>
      </Table>

      <!-- ----------------------------------------- -->
      <pagination v-model="queryModel" @change="change"></pagination>
      <el-dialog
        :title="title"
        width="500px"
        center
        :visible.sync="dialogFormVisible"
      >
        <el-form
          :model="formModel"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类型" prop="type">
            <el-select v-model="formModel.type" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="父级菜单" prop="parentId">
            <el-select v-model="formModel.parentId" placeholder="请选择">
              <el-option
                v-for="item in typee"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示名称" prop="label">
            <el-input v-model="formModel.label"></el-input>
          </el-form-item>
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="formModel.icon"></el-input>
          </el-form-item>
          <el-form-item label="component" prop="component">
            <el-input v-model="formModel.component"></el-input>
          </el-form-item>
          <el-form-item label="路径" prop="path">
            <el-input v-model="formModel.path"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识" prop="perms">
            <el-input v-model="formModel.perms"></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formModel.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="success" v-on:click="handleMenu">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { menuListApi, menuAddAPI, menuUpdateAPI } from '../../api/menu'
import Search from '../../components/Search.vue'
import Table from '../../components/Table.vue'
import { level, color } from './level'
import Pagination from '../../components/Pagination.vue'
import cols from './cols'
export default {
  components: {
    Table,
    Search,
    Pagination
  },
  data() {
    return {
      typee: [
        {
          id: 0,
          title: '一级菜单'
        },
        {
          id: 1,
          title: '控制台'
        },
        {
          id: 2,
          title: '系统管理'
        },
        {
          id: 3,
          title: '菜单管理'
        },
        {
          id: 4,
          title: '角色管理'
        },
        {
          id: 5,
          title: '用户管理'
        }
      ],
      types: [
        {
          title: '目录',
          id: 0
        },
        {
          title: '菜单',
          id: 1
        },
        {
          title: '按钮',
          id: 2
        }
      ],
      rules: {
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        parentId: [
          { required: true, message: '请选择父级菜单', trigger: 'blur' }
        ],
        label: [{ required: true, message: '请输入展示名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入文件名称', trigger: 'blur' }],
        icon: [{ required: true, message: '请输入图标', trigger: 'blur' }],
        component: [
          { required: true, message: '请输入component', trigger: 'blur' }
        ],
        path: [{ required: true, message: '请输入路径', trigger: 'blur' }],
        perms: [{ required: true, message: '请输入标识', trigger: 'blur' }],
        status: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      level,
      color,
      menuList: [],
      formModel: {
        children: [],
        component: '',
        icon: '',
        label: '',
        parentId: '',
        path: '',
        perms: '',
        status: '',
        type: ''
      },
      queryModel: {
        current: 1,
        size: 10,
        username: ''
      },
      cols,
      dialogFormVisible: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    search() {
      this.queryModel.current = 1
      this.getMenuList()
    },
    async getMenuList() {
      try {
        this.menuList = await menuListApi(this.queryModel)
      } catch (e) {
        console.log(e)
      }
    },
    async handleMenu() {
      try {
        await (this.formModel.id ? menuUpdateAPI : menuAddAPI)(this.formModel)
        this.$notify({
          title: '提示',
          message: `请求成功`,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getMenuList()
      } catch (e) {
        console.log(e)
      }
    },

    change(obj) {
      this.queryModel = obj
      this.getMenuList()
    }
  },
  computed: {
    title() {
      return this.formModel.id ? '编辑用户' : '新增用户'
    }
  }
}
</script>

<style scoped>
.seare {
  display: flex;
  justify-content: space-between;
}
</style>
