<template>
  <el-row style="height: 100%;">
     <el-col :span="4" class="nav">
        <el-menu 
        class="nav-menu" 
        background-color="#545c64"
        >

        </el-menu>
     </el-col>
     <router-view></router-view>  
   </el-row>
</template>
<script>
export default {
  name: 'manage',
  data () {
    return {
    }
  }

}
</script>
<style lang="scss" scoped>
.nav{
  height: 100%;
}


</style>
