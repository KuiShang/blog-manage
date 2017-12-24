<template>
  <div class="manager">
    <el-dialog title="用户编辑" :visible.sync="dialogVisible">
      <edit :data="editData" @save="modifyPsw" v-loading="saveLoading" />
    </el-dialog>
    <el-row style="height: 100%;">
      <el-col :span="4" class="nav">
          <el-menu 
            ref="elmenu"
            class="nav-menu" 
            background-color="#545c64"
            text-color="#fff"
            default-active="pageview"
            active-text-color="#ffd04b"
            :router = true>

            <div class="header-logo" @click="clickHead">
              <h2 class="manager">
                <span class="m">M</span>
                <span class="m">a</span>
                <span class="m">n</span>
                <span class="m">a</span>
                <span class="m">g</span>
                <span class="m">e</span>
                <span class="m">r</span>
              </h2>
            </div>

            <el-menu-item 
            v-if="!item.children"
            v-for="(item, index) in menuItems" :key="index"
            :index="item.id" 
            >
              <i :class="item.class"></i>
              <span slot="title">{{item.text}}</span>
            </el-menu-item>

            <el-submenu v-else
            v-for="(item, index) in menuItems" :key="index"
            :index="item.id"
            >
              <template slot="title">{{item.text}}</template>
              <el-menu-item
              v-for="(child, index) in item.children" :key="index"
              :index="child.id"
              >
                {{child.text}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-col>

      <el-col :span = "menuShow ? 20: 24" class="content">
        <div class="content-header">
          <header class="header">
            <h2 class="title">浏览记录</h2>
            <div class="user-operator">
              <span class="operator" @click="dialogVisible = true">
                <i class="icon iconfont font-kk-shenfenzheng"></i>
                <span >个人信息</span>
              </span>
              <span class="operator" @click="logout">
                <i class="icon iconfont font-kk-emoji_line11"></i>
                <span>退出</span>
              </span>
            </div>
          </header>
        </div>

        <div class="content-body">
          <div class="wrapper">
            <router-view></router-view>  
          </div>
        </div>
      </el-col>
      
    </el-row>
  </div>
</template>
<script>
import menus from './menus'
import edit from '../user/edit'
import urls from '@/config/urls'
export default {
  name: 'manage',
  components: {edit},
  data () {
    return {
      menuItems: menus,
      menuShow: true,
      dialogVisible: false,
      saveLoading: false,
      editData: { username: this.$store.state.user.username, password: '' }
    }
  },
  methods: {
    async modifyPsw (form) {
      this.saveLoading = true
      const res = await this.axios.post(urls.modifyPsw, {
        username: form.username,
        password: form.password
      })
      if (res.data.status === 0) {
        this.saveLoading = false
        this.dialogVisible = false
      }
    },
    clickHead () {
      this.$refs.elmenu.activeIndex = 'pageview'
      this.$router.push({name: 'pageview'})
    },
    async logout () {
      const res = await this.axios.post(urls.logout, {
      })
      if (res.data.status === 0) {
        this.$router.push({name: 'login'})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/var.scss";
.manager {
  height: 100%;
}
.nav{
  height: 100%;
  .nav-menu {
     height: 100%;
     .header-logo{
      .manager {
        cursor: pointer;
        color: #fff;
        height: $header-heigth;
        background: rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .m {
          transition: all linear .8s;
        }
        span:nth-of-type(1){color:#FFA0FF;};
        span:nth-of-type(2){color:#DB7CFF;};
        span:nth-of-type(3){color:#B758FF;};
        span:nth-of-type(4){color:#9334FF;};
        span:nth-of-type(5){color:#6F10FF;};
        span:nth-of-type(6){color:#4B00FF;};
        span:nth-of-type(7){color:#2700FF;};
      }
      &:hover {
         .manager {
          span:nth-of-type(1){transform:rotateY(180deg);color:#0060FF;};
          span:nth-of-type(2){transform:rotateY(180deg);color:#243CDB;};
          span:nth-of-type(3){transform:rotateY(180deg);color:#4818B7;};
          span:nth-of-type(4){transform:rotateY(180deg);color:#6C0093;};
          span:nth-of-type(5){transform:rotateY(180deg);color:#90006F;};
          span:nth-of-type(6){transform:rotateY(180deg);color:#B4004B;};
          span:nth-of-type(7){transform:rotateY(180deg);color:#D80027;};
        }
      }
    }
  }
}

.content {
    position: relative;
    height: 100%;
    border-radius: 0;
    .content-header {
      position: absolute;
      width: 100%;
      height: 58px;
      padding: 0 10px;
      border-bottom: 1px solid #eee;
      .header {
        display: flex;
        align-items: center;
        height: 100%;
        .title {
          flex:1;
        }
        .operator {
          cursor: pointer;
          transition: all .5s;
          &:hover {
            color: $blue;
          }
        }
        .operator + .operator {
           margin-left: 15px;

        }
      }
    }
    .content-body {
      padding-top: 58px;
      height: 100%;
      .wrapper {
        padding: 10px;
        height: 100%;
        overflow-y: auto;
      }
    }
}


</style>
