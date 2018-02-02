<template>
<div class="catlog">
    <div class="action">
        <el-button type="primary" @click="editDialog = true">新增</el-button>
    </div>
    <el-table :data="catalogs">
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="描述" prop="des"/>
      <el-table-column label="创建时间" >
        <template slot-scope="scope">
          <span>{{scope.row.create_time| datetime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" >
        <template slot-scope="scope">
          <span>{{scope.row.modify_time | datetime}}</span>
        </template>
      </el-table-column>
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
    <el-dialog title="新增" 
    :visible.sync="editDialog"
    @close="dialogClose"
    >
      <edit
      :isNew="isNew"
      :editData="editData"
      @save="save"
      @modify="modify"
      @cancel="editDialog = false"/>
    </el-dialog>
</div>
</template>
<script>
import edit from './edit'
import catalogMix from '@/mix/catalogMix'

const CATALOG_URL = '/v1/catalog/'
export default {
  name: 'catalog',
  components: { edit },
  data () {
    return {
      editData: {},
      pageData: {},
      editDialog: false,
      isNew: true,
      currentPage: 1
    }
  },
  created () {
    this.getCatalogs()
  },
  mixins: [catalogMix],
  methods: {
    pageChange () {
    },
    async edit (id) {
      console.log(id)
      this.editDialog = true
      this.isNew = false
      let ret = await this.axios.get(CATALOG_URL + id)
      if (ret.data.status === 0) {
        this.editData = ret.data.data
      }
      console.log(ret)
    },
    remove (id) {

    },
    async save (data) {
      console.log('save')
      const res = await this.axios.post(CATALOG_URL, data)
      console.log(res)
      this.editDialog = false
      if (res.data.status === 0) {
        this.getCatalogs()
      }
    },
    async modify (data) {
      console.log('modify')
      const res = await this.axios.put(CATALOG_URL + data._id, data)
      console.log(res)
      this.editDialog = false
      if (res.data.status === 0) {
        this.getCatalogs()
      }
    },
    dialogClose () {
      this.editData = {}
      this.isNew = true
    }
  }
}
</script>
