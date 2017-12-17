<template>
    <div class="main-bg">
        <div class="login">
          	<transition name="drop" appear>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
              <div class="title">login</div>
                <el-form-item prop="username">
                    <el-input class="form-input" v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="form-input"  type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                </el-form-item>
            </el-form>
            </transition>
        </div>
    </div>
</template>
<script>
import urls from '@/config/urls'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    async submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.axios.post(urls.login, {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          console.log(res)
          if (res.data.status === 0) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push({ name: 'home' })
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/var.scss";
.main-bg {
  height: 100%;
  width: 100%;
  background: $color-bg;
  color: $white;
  .login {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .login-form {
      min-width: 300px;
      .title {
        cursor: pointer;
        transition: all 0.8s;
        text-transform: uppercase;
        font-weight: 100;
        font-size: $font-size-big;
        margin-bottom: 24px;
      }
      &:hover {
        .title {
          transform: scale(1.2) translate(120px);
        }
      }
    }
  }
}
</style>
