<template>
  <div class="box">
    <div class="left">
      <i
        class="el-icon-s-fold"
        @click="$store.commit('tagsview/setisCollspac')"
      ></i>
      <tags-view></tags-view>
    </div>
    <div class="right">
      <i class="el-icon-rank"></i>
      <i
        class="el-icon-circle-close"
        @click="$store.commit('tagsview/deleteAll')"
      ></i>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar
            :size="40"
            :src="$store.getters.UserInfo.avatar"
          ></el-avatar>
          <h2 style="color: #fff; margin: 0 5px">
            {{ $store.getters.UserInfo.username }}
          </h2>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import loginApi from '../../api/login'
import TagsView from '../../components/TagsView.vue'
export default {
  components: {
    TagsView
  },
  data() {
    return {
      userInfo: ''
    }
  },
  methods: {
    handleCommand(commad) {
      switch (commad) {
        case 'logout':
          this.handleLogout()
          break
      }
    },
    async handleLogout() {
      this.$confirm('您确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$store.dispatch('user/logout')
          this.$notify({
            title: '提示',
            message: '正在退出...',
            type: 'success'
          })
          const res = loginApi.logout()
          this.$router.push('/login')
          console.log(res)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
.el-icon-s-fold {
  font-size: 25px;
  color: #fff;
  margin: 0 10px;
}
.left {
  display: flex;
  align-items: center;
}
.el-icon-circle-close {
  color: #fff;
  font-size: 30px;
  margin: 0 15px;
}
.el-icon-rank {
  color: #fff;
  font-size: 30px;
}
.right {
  display: flex;
  align-items: center;
}
</style>
