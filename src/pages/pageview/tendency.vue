<template>
    <div class="line1">
        <div id="line1" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
export default {
  mounted () {
    this.myChart = echarts.init(document.getElementById('line1'))
    this.initData()
  },
  props: ['sevenDate', 'sevenDay'],
  methods: {
    initData () {
      const colors = ['#5793f3', '#675bba', '#d14a61']
      const option = {
        color: colors,
        title: {
          text: '走势图',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['PV', 'UV']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { show: true, readOnly: false },
            magicType: { type: ['bar', 'line'] },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sevenDay.length > 0 ? this.sevenDay : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: [
          {
            type: 'value',
            name: '数量',
            min: 0,
            max: 200,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '订单',
            min: 0,
            max: 200,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'PV',
            type: 'line',
            data: this.sevenDate[0] ? this.sevenDate[0] : [121, 41, 35, 143, 102, 33, 80],
            yAxisIndex: 1,
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
            }
          },
          {
            name: 'UV',
            type: 'line',
            data: this.sevenDate[1] ? this.sevenDate[1] : [21, 10, 15, 13, 42, 13, 30],
            yAxisIndex: 1,
            markPoint: {
              data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
            }
          }
        ]
      }
      this.myChart.setOption(option)
    }
  },
  watch: {
    sevenDate () {
      this.initData()
    },
    sevenDay () {
      this.initData()
    }
  }
}
</script>

<style lang="scss">
.line1 {
  display: flex;
  justify-content: center;
}
</style>
