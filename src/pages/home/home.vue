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
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    home
  </div>
  

</template>
<script>
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
      daterange: getDateToNow(7),
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
  methods: {
    rangeChange () {
      console.log('change-ranged')
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
