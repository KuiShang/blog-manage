<template>
<div class="article">
    
    <div class="filter">
        <el-form :inline="true">
          <el-form-item label="状态">
              <el-select v-model="queryParams.status" placeholder="状态">
                <el-option v-for="(v,k) in status" :label="v.text" :key="k" :value="k"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="目录">
              <el-select v-model="queryParams.catalog" placeholder="目录">
                <el-option v-for="(cata, idx) in catalogs" :key="idx" :label="cata.name" :value="cata._id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="  ">
            <el-button type="primary" @click="editDialog = true">新增文章</el-button>
          </el-form-item>
        </el-form>
    </div>
    <el-table :data="pageData.data">
      <el-table-column label="栏目" prop="catalog_name" width="120px"></el-table-column>
      <el-table-column label="标题" prop="title" >
        <template slot-scope="scope">
          <u @click="showPreview(scope.row)"> {{scope.row.title}}</u>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80px" >
        <template slot-scope="scope">
          <el-tag :type="status[scope.row.status].type">{{status[scope.row.status].text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" >
        <template slot-scope="scope">
          <el-date-picker v-model="scope.row.create_time" 
          type="datetime" 
          placeholder="创建时间" 
          :clearable="false" 
          :editable="false" 
          format="yyyy-MM-dd HH:mm" 
          @change="updateCreateTime(scope.row.id, scope.row.create_time)"
          />
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.modify_time | datetime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="publish(scope.row.id)" v-if='scope.row.status === 1'>发布</el-button>
          <el-button type="primary" size="small" @click="unpublish(scope.row.id)" v-if='scope.row.status === 2'>取消发布</el-button>
          <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" v-if="scope.row.status !== 0" @click="remove(scope.row.id)">删除</el-button>
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
      v-if="editDialog"
       ref="edit"
       :editData="editData"
       @save="save"
       @close="closeEdit"
       @cancel="editDialog = false"
       v-loading="saveLoading"
       />
    </el-dialog>
</div>
</template>
<script>
import edit from './edit'
import catalogMix from '@/mix/catalogMix'
// import articlePublishMix from '@/mix/articlePublishMix'
// import { MarkdownPreview } from 'markdown-it-editor'
// import urls from '@/config/urls'
const status = {
  2: { text: '已发布', type: 'success' },
  1: { text: '草稿中', type: '' }
}
const ARTICLE_URL = '/v1/article/'
export default {
  name: 'articles',
  data () {
    return {
      editData: {},
      pageData: {},
      isNewArticle: true,
      previewShow: false,
      editDialog: false,
      queryParams: {status: '', catalog: ''},
      currentPage: 1,
      saveLoading: false
    }
  },
  mixins: [catalogMix],
  created () {
    this.getArticleList()
    this.getCatalogs()
  },
  components: {edit},
  computed: {
    status () {
      return status
    }
  },
  methods: {
    async save (article) {
      this.saveLoading = true
      let res
      if (this.isNewArticle) {
        res = await this.axios.post(ARTICLE_URL, article)
      } else {
        res = await this.axios.put(ARTICLE_URL + article.id, article)
      }
      this.saveLoading = false

      if (res.data.status === 0) {
        this.$notify.success({
          title: '发布成功',
          message: '恭喜你,经验值 +1',
          offset: 100
        })
        this.closeEdit()
      } else {
        this.$notify.error({
          title: '发布失败',
          message: '发请稍后重试',
          offset: 100
        })
      }
    },
    remove (id) {
      console.log(id)
      this.$confirm(this.deleteMsg || '确定要删除该条记录吗?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        return this.axios.delete(ARTICLE_URL + id).then((ret) => {
          console.log(ret)
          if (ret.data.data.ok === 0) {
            this.$message.info('删除失败，没有这条记录')
          } else {
            this.$message.success('删除成功')
          }
        })
      })
      .then(() => { return this.getArticleList() })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async publish (id) {
      let ret = await this.axios.patch(ARTICLE_URL + id, {status: 2})
      console.log(ret)
      if (ret.data.status === 0) {
        if (ret.data.data.ok === 1) {
          this.getArticleList()
        } else if (ret.data.data.ok === 0) {
          this.$message({
            type: 'info',
            message: '未找到该文章对应的id'
          })
        }
      }
    },
    async unpublish (id) {
      let ret = await this.axios.patch(ARTICLE_URL + id, {status: 1})
      if (ret.data.status === 0) {
        if (ret.data.data.ok === 1) {
          this.getArticleList()
        } else if (ret.data.data.ok === 0) {
          this.$message({
            type: 'info',
            message: '未找到该文章对应的id'
          })
        }
      }
    },
    async edit (id) {
      this.isNewArticle = false
      this.editDialog = true
      let ret = await this.axios.get(ARTICLE_URL + id)
      if (ret.data.status === 0) {
        this.editData = ret.data.data
      }
      console.log(ret)
    },
    async getArticleList (pageSize = 10, currentPage = 1) {
      const res = await this.axios.get(ARTICLE_URL, {
        params: {
          'page_size': pageSize,
          'current_page': currentPage
        }
      })
      if (res.data.status === 0) {
        this.pageData = res.data.data
      }
    },
    showPreview (article) {
      this.previewShow = true
      this.preview = article
    },
    updateCreateTime (id, time) {
      // if (typeof time === 'number') return
      // this.$post('article/createtime/' + id, {time: time.getTime()}).then(() => {
      //   this.$message.success('创建时间修改成功')
      // })
    },
    pageChange () {
    },
    closeEdit () {
      this.editDialog = false
      this.editData = {}
      this.getArticleList()
    },
    handleClose (done) {
      let content = this.$refs.edit.form.content
      this.editData = {}
      if (content.length > 0) {
        this.$confirm('内容还未保存,确认关闭？')
        .then(_ => {
          done()
          this.isNewArticle = true
        })
        .catch(_ => {})
      } else {
        done()
        this.isNewArticle = true
      }
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
