<template>
  <div class="edit">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name" placeholder="标签名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click.prevent="saveAction">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'edit',
  data () {
    return {
      form: {name: ''},
      rules: {
        name: {required: true}
      }
    }
  },
  props: ['editData', 'isNew'],
  methods: {
    saveAction () {
      if (this.isNew) {
        this.$emit('save', this.form)
      } else {
        this.$emit('modify', this.form)
      }
    }
  },
  watch: {
    editData (newdata, old) {
      this.form = {...this.form, ...newdata}
      if (this.isNew) {
        for (let key in this.form) {
          this.form[key] = ''
        }
      }
      console.log(newdata, old)
    }
  }
}
</script>

