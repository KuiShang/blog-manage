<template>
<div class="article">
    <el-button type="primary" @click="editDialog = true">新增</el-button>
    <div class="filter">
        <el-form :inline="true">
          <el-form-item label="状态">
              <el-select v-model="queryParams.status" placeholder="状态">
                <el-option v-for="(v,k) in status" :label="v.text" :key="k" :value="k"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="目录">
              <el-select v-model="queryParams.catalog" placeholder="目录">
                <el-option v-for="(cata, idx) in catalogs" :key="idx" :label="cata.name" :value="cata.catalog_id"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
    </div>
    <el-table :data="pageData.data">
      <el-table-column label="栏目" prop="catalogName"></el-table-column>
      <el-table-column label="标题" prop="title" >
        <template slot-scope="scope">
          <u @click="showPreview(scope.row)"> {{scope.row.title}}</u>
        </template>
      </el-table-column>
      <el-table-column label="状态" >
        <template slot-scope="scope">
          <el-tag :type="status[scope.row.status].type">{{status[scope.row.status].text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" >
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.createTime" type="datetime" placeholder="创建时间" :clearable="false" :editable="false" format="yyyy-MM-dd HH:mm" @change="updateCreateTime(scope.row.id, scope.row.createTime)"/>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" inline-template>
        <span>{{row.updateTime | datetime}}</span>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if='scope.row.status === 1'>发布</el-button>
          <el-button type="primary" size="small" v-if='scope.row.status === 2'>取消发布</el-button>
          <el-button type="primary" size="small" >编辑</el-button>
          <el-button type="danger" size="small" v-if="scope.row.status !== 0">删除</el-button>
          <el-button type="success" size="small" v-if="scope.row.status === 0">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :total="pageData.total" :current-page="currentPage" :page-size="pageData.pageSize" @current-change="pageChange" layout="prev, pager, next"></el-pagination>
    </div>
    <el-dialog title="preview.title" v-model="previewShow" :fullscreen="true"></el-dialog>
    <el-dialog 
    title="文章编辑" 
    v-model="editDialog" 
    :visible.sync="editDialog"
    :before-close="handleClose"
    :fullscreen="true">
      <edit 
       :editData="editData"
       @save="save"
       @close="closeEdit"
       @cancel="editDialog = false"
       />
    </el-dialog>
</div>
</template>
<script>
import edit from './edit'
import catalogMix from '@/mix/catalogMix'
import { MarkdownPreview } from 'markdown-it-editor'
const status = {
  2: { text: '已发布', type: 'success' },
  1: { text: '草稿中', type: '' },
  0: { text: '已删除', type: 'danger' }
}
export default {
  name: 'articles',
  data () {
    return {
      editData: {},
      pageData: {},
      previewShow: false,
      editDialog: false,
      queryParams: {status: '', catalog: ''},
      currentPage: 1
    }
  },
  mixins: [catalogMix],
  created () {
    this.getCatalogs()
  },
  components: {edit, MarkdownPreview},
  computed: {
    status () {
      return status
    }
  },
  methods: {
    edit () {

    },
    showPreview (article) {
      this.previewShow = true
      this.preview = article
    },
    updateCreateTime (id, time) {
      if (typeof time === 'number') return
      this.$post('article/createtime/' + id, {time: time.getTime()}).then(() => {
        this.$message.success('创建时间修改成功')
      })
    },
    pageChange () {
    },
    closeEdit () {
      this.editDialog = false
      this.loadPage()
    },
    save () {
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
