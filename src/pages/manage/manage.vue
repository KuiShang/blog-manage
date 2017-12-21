<template>
  <el-row style="height: 100%;">
     <el-col :span="4" class="nav">
        <el-menu 
        class="nav-menu" 
        background-color="#545c64"
        text-color="#fff"
        :router = true
        >
          <div class="header-logo">
            <h2>Manager</h2>
          </div>

          <el-menu-item 
          v-if="!item.children"
          v-for="(item, index) in menuItems" :key="index"
          :index="item.id" 
          >
            {{item.text}}
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
            <span class="operator">
              <i class="fa fa-user"></i>
              <span>个人信息</span>
            </span>
            <span class="operator">
              <i class="fa fa-sign-out"></i>
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
</template>
<script>
import menus from './menus'
export default {
  name: 'manage',
  data () {
    return {
      menuItems: menus,
      menuShow: true
    }
  }

}
</script>
<style lang="scss" scoped>
@import "../../style/var.scss";
.nav{
  height: 100%;
  .nav-menu {
     height: 100%;
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
        .title {
          flex:1;
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
