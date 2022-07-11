<template>
  <div class="box">
    <div class="from">
      <h1>智慧服务平台</h1>
      <h2>欢迎登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="from"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入账号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            style=""
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div style="display: flex">
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入验证码"
              style="width: 150px"
            ></el-input>
            <img
              :src="imgCode"
              alt=""
              @click="getImgCodes"
              style="width: 80px; margin-left: 10px; border-radius: 5px"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            style="width: 240px"
            :loading="loadingStatus"
            @click="handleSubmitLogin"
            >{{ loadingStatus ? '登录中...' : '立即登录' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import rule from './rule'
import loginApi from '../../api/login'
export default {
  data() {
    return {
      loadingStatus: false,
      ruleForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      imgCode: '',
      rules: rule
    }
  },
  created() {
    this.getImgCodes()
  },
  methods: {
    ...mapMutations({ setToken: 'user/setToken' }),
    async getImgCodes() {
      const res = await loginApi.getImgCode()
      this.imgCode = res.captchaImg
      this.ruleForm.token = res.token
    },

    async handleSubmitLogin() {
      try {
        this.loadingStatus = true
        const res = await loginApi.login(this.ruleForm)
        if (!res) return
        this.setToken(res)
        this.$notify({ title: '提示', message: '登录成功', type: 'success' })

        await this.$router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingStatus = false
      }
    }
  }
}
</script>

<style scoped>
.box {
  background: url('http://zh.9yuecloud.com/img/bg.970bc3a9.jpg');
  height: 100%;
  /* text-align: center; */
  padding-top: 60px;
}
h1 {
  color: #fff;
  font-size: 40px;
}
h2 {
  color: #fff;
  margin-top: 50px;
}
.from {
  width: 240px;
  height: 500px;
  position: absolute;
  top: 30%;
  left: 50%;
  margin: -110px -120px;
}
</style>
