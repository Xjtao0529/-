<template>
  <div>
    <el-card>
      <el-breadcrumb
        v-if="$route.path !== '/system'"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item :to="{ path: '/system' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sys/users' }"
          ><a>系统管理</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h4 v-else style="margin: 0; padding: 0">控制台</h4>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.el-card {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
