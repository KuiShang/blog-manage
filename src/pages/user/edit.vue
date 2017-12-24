<template>
  <div>
      <el-form :model="form"
      ref="form"
      :rules="rules"
      label-position="top">
        <el-form-item label="用户名" prop="name">
          <el-input size="large" v-model="form.username" placeholder="用户名" :disabled="true"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="large"  v-model="form.password" placeholder="密码" type="password"/>
        </el-form-item>
        <el-form-item class="save-container">
          <el-button type="primary" @click.prevent="saveAction" class="save">保存</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<<script>
export default {
  props: ['data'],
  data () {
    return {
      form: {password: '', username: this.data.username},
      rules: {
        name: {required: true},
        password: {required: true}
      }
    }
  },
  methods: {
    saveAction () {
      this.$emit('save', { ...this.form })
      this.form.password = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.save-container {

}
.save {
  position: absolute;
  right : 0;
}
</style>


