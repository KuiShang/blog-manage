<template>
<div class="catlog">
    <div class="action">
        <el-button type="primary" @click="editDialog = true">新增</el-button>
    </div>
    <el-table :data="catalogs">
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="描述" prop="des"/>
      <el-table-column label="排序" prop="catalog_id"/>
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
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination :total="pageData.total" :current-page="pageData.pageSize" :page-size="currentPage" @current-change="pageChange" layout="prev, pager, next"></el-pagination>
    </div>
    <el-dialog title="新增" :visible.sync="editDialog">
        <edit        
        :data="editData"
        @save="save"
        @close="closeEdit"
        @cancel="editDialog = false"/>
    </el-dialog>
</div>
</template>
<script>
import edit from './edit'
import catalogMix from '@/mix/catalogMix'
export default {
  name: 'catalog',
  components: { edit },
  data () {
    return {
      editData: {},
      pageData: {},
      editDialog: false,
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
    save () {
    },
    closeEdit () {
    }
  }
}
</script>
