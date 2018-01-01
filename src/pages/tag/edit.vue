<template>
  <div class="edit">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name" placeholder="标签名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button >取消</el-button>
        <el-button type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'edit',
  data () {
    return {
      form: {name: '', ...this.data},
      rules: {
        name: {required: true}
      }
    }
  },
  methods: {
    saveAction () {
      this.$emit('save', this.form)
    }
  }
}
</script>

