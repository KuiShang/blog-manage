<template>
    <div class="edit">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="栏目名称" prop="name">
              <el-input v-model="form.name" placeholder="栏目名称"></el-input>
          </el-form-item>
          <el-form-item label="栏目描述" prop="description">
              <el-input v-model="form.description" placeholder="栏目描述"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" placeholder="排序"></el-input>
          </el-form-item>
          <el-form-item >
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
      form: {name: '', description: '', sort: 0, ...this.editData},
      rules: {
        name: {required: true}
      }
    }
  },
  props: ['editData'],
  methods: {
    saveAction () {
      this.$emit('save', this.form)
    }
  }
}
</script>

