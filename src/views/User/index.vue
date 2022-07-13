<template>
  <div>
    <el-card>
      <Table :data="list" :cols="cols">
        <template v-slot:avatar="{ row }">
          <el-avatar size="50" :src="row.avatar"></el-avatar>
        </template>
        <template v-slot:roles="{ row }">
          <el-tag v-for="item in row.roles" :key="item.id">
            {{ item.name }}</el-tag
          >
        </template>
        <template v-slot:action>
          <el-button plain size="mini" type="success">编辑</el-button>
          <el-button plain size="mini" type="warning">分配角色</el-button>
          <el-button plain size="mini" type="danger">删除</el-button>
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
    </el-card>
  </div>
</template>

<script>
import loginApi from '../../api/login'
import Table from '../../components/Table.vue'
import cols from './cols'
export default {
  components: {
    Table
  },
  data() {
    return {
      cols,
      queryModel: {
        current: 1,
        size: 5,
        username: ''
      },
      list: []
    }
  },
  created() {
    this.getUserLists()
  },
  methods: {
    async getUserLists() {
      try {
        const res = await loginApi.getUserList(this.queryModel)
        console.log(res, '44')
        this.list = res.records
      } catch (error) {}
    }
  }
}
</script>

<style scoped>
.el-card {
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}
</style>
