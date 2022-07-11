<template>
  <div class="box">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
