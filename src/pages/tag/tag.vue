         
<template>
<div class="tag">
    <div class="action">
        <el-button type="primary" @click="editDialog = true">新增标签</el-button>
    </div>
    <el-table :data="tags">
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="文章数量" prop="articleCount"/>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" @click="edit(scope.row._id)" >编辑</el-button>
            <el-button type="danger" size="mini" @click="remove(scope.row._id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination :total="pageData.total" :current-page="pageData.pageSize" :page-size="currentPage" @current-change="pageChange" layout="prev, pager, next"></el-pagination>
    </div>
    <el-dialog title="新增" :visible.sync="editDialog" @close="dialogClose">
        <edit        
        :editData="editData"
        :isNew="isNew"
        @save="save"
        @modify="modify"
        @cancel="editDialog = false"/>
    </el-dialog>
</div>
</template>
<script>
import tagMix from '@/mix/tagMix'
import edit from './edit'
const TAG_URL = '/v1/tag/'
export default {
  name: 'tag',
  components: { edit },
  created () {
    this.getTags()
  },
  data () {
    return {
      isNew: true,
      editData: {},
      pageData: {},
      editDialog: false,
      currentPage: 1
    }
  },
  mixins: [tagMix],
  methods: {
    pageChange () {
    },
    async edit (id) {
      console.log(id)
      this.editDialog = true
      this.isNew = false
      let ret = await this.axios.get(TAG_URL + id)
      if (ret.data.status === 0) {
        this.editData = ret.data.data
      }
      console.log(ret)
    },
    remove (id) {
    },
    async save (data) {
      console.log('save')
      const res = await this.axios.post(TAG_URL, data)
      console.log(res)
      this.editDialog = false
      if (res.data.status === 0) {
        this.getTags()
      }
    },
    async modify (data) {
      console.log('modify')
      const res = await this.axios.put(TAG_URL + data._id, data)
      console.log(res)
      this.editDialog = false
      if (res.data.status === 0) {
        this.getTags()
      }
    },
    dialogClose () {
      this.editData = {}
      this.isNew = true
    }
  }
}
</script>
