<template>
  <el-row style="height: 100%;">
     <el-col :span="4" class="nav">
        <el-menu 
        class="nav-menu" 
        background-color="#545c64"
        text-color="#fff"
        router = true
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
     <router-view></router-view>  
   </el-row>
</template>
<script>
import menus from './menus'
export default {
  name: 'manage',
  data () {
    return {
      menuItems: menus,
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


</style>
