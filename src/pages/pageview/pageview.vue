<template>
  <div class="pageview">
    <div class="filter">
      <el-form>
        <el-form-item label="时间范围">
          <el-date-picker 
          v-model = "daterange"
          type='daterange'
          @change="rangeChange"
          align='left'
          placeholder='选择日期范围'
          :picker-options='pickerOptions'
          />
        </el-form-item>
        <el-tabs v-model="currentTab">
          <el-tab-pane label='图表' name='first'>
            <p>今日数据统计</p>
            <p>PV: {{pvData[pvData.length - 1]}} UV: {{uvData[uvData.length - 1]}}</p>
            <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
          </el-tab-pane>
          <el-tab-pane label='详情' name='second'>
            <el-table :data="pageData.data"
            border=""
            style="width: 100%">
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <a :href="scope.row.fullPath">{{scope.row.fullPath}}</a>
                </template>
              </el-table-column>
              <el-table-column label="访问时间">
                <template slot-scope="scope">
                  <span>{{scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="IP">
                <template slot-scope="scope">
                  <span>{{scope.row.ip + '@' + scope.row.location}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="userAgent" label="userAgent">
              </el-table-column>
            </el-table>

            <div class="pagination">
              <el-pagination 
              layout="total, sizes, prev, pager, next, jumper" 
              :total="pageData.total" 
              :page-sizes="[10, 20, 40, 80]" 
              :page-size="pageData.pageSize" 
              @current-change="pageChange" 
              @size-change="sizeChange" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>
<script>
import dateFormat from '../../utils/util.js'
import DTMix from '../../mix/DTMix'
import tendency from './tendency'
function getDateToNow (num) {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * num)
  return [start, end]
}
export default {
  name: 'home',
  data () {
    return {
      sevenDay: [],
      sevenDate: [],
      daterange: getDateToNow(7),
      currentTab: 'first',
      rangeData: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            picker.$emit('pick', getDateToNow(7))
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            picker.$emit('pick', getDateToNow(30))
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            picker.$emit('pick', getDateToNow(90))
          }
        }]
      }
    }
  },
  components: {tendency},
  mixins: [DTMix],
  methods: {
    rangeChange () {
      console.log('change-ranged')
    },
    dataAnalysis () {
      let data = {}
      this.rangeData.forEach(pv => {
        let timeKey = dateFormat(new Date(pv.createTime), 'yyyy-MM-dd')
        let ips = data[timeKey] || []
        ips.push(pv.ip)
        data[timeKey] = ips
      })
      return data
    },
    pvData () {
      return Object.values(this.dataAnalysis).map(ips => {
        return ips && ips.length
      })
    },
    uvData () {
      return Object.values(this.dataAnalysis).map(ips => {
        return new Set([...ips]).size
      })
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
