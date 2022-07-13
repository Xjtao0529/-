<template>
  <el-container>
    <el-aside width="200px">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main>
        <Breadcrumb></Breadcrumb>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'
import Aside from './Aside'
import Header from './Header'
import Main from './Main'
export default {
  components: {
    Aside,
    Header,
    Main,
    Breadcrumb
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #18bc9c;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #fff;
  background-color: #222d32;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
