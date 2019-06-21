<template>
  <div class="echarts-home" ref="echartsHome">loading...</div>
</template>
<script>
/**
 * @prop { Array } xData x轴数据
 * @prop { Array } yData y轴数据
 * @prop { Boolean } aibank 是否是aibank
 * @prop { Function } tooltipFormat echarts[tooltip.formatter的函数]
 */
import echarts from 'echarts'
import dayjs from 'dayjs'
import numeral from 'numeral'
const aibankColor = '#1EA6E9'
export default {
  name: 'JdEchartsHome',
  props: {
    xData: {
      type: Array,
      default: () => ([])
    },
    yData: {
      type: Array,
      default: () => ([])
    },
    aibank: {
      type: Boolean,
      default: false
    },
    tooltipFormat: {
      type: Function,
      default: (params, ticket, callback) => {
        const data = params[0]
        const { value } = data
        const sumMoney = numeral(value).format('0,0.00')
        return `到今日累计收益：${sumMoney}`
      }
    }
  },
  data() {
    return {
      // xData: [],
      // yData: [],
      echartsInstance: null
    }
  },
  watch: {
    xData(val) {
      this.updateEcharts()
    }
  },
  mounted() {
    this.initEcharts()
    // this.updateData()
  },
  methods: {
    initEcharts() {
      const echartsHome = this.$refs.echartsHome
      this.echartsInstance = echarts.init(echartsHome)
      const aibank = this.aibank
      const options = {
        // x坐标轴
        xAxis: {
          type: 'category',
          offset: 0,
          // 坐标轴轴线相关设置
          axisLine: {
            // 轴线显示
            show: false
          },
          // 坐标轴刻度相关设置
          axisTick: {
            // 刻度显示
            show: false
          },
          // 刻度标签
          axisLabel: {
            // 显示刻度
            interval: (index, value) => {
              // 中间要显示的
              if (index % 7 === 6 && index <= 21) {
                return true
              } // 第一天
              else if (index === 0) {
                return true
              } // 最后一天
              else if (index === 29) {
                return true
              }
              else {
                return false
              }
            },
            formatter: (value, index) => {
              return dayjs(value).format('MM-DD')
            },
            color: '#666',
            fontFamily: 'Helvetica',
            fontSize: 12,
            align: 'center',
            lineHeight: 14
          },
          axisPointer: {
            // 显示hover
            show: true,
            type: 'line',
            // 自动吸附
            snap: true,
            // hover文本标签。
            label: {
              show: true,
              formatter: (params) => {
                return dayjs(params.value).format('YYYY-MM-DD')
              },
              margin: -235,
              color: '#999',
              fontFamily: 'Helvetica',
              fontSize: 10,
              backgroundColor: 'transparent'
            },
            // hover线（竖的）
            lineStyle: {
              color: '#F4F4F4',
              width: 2
            }
          },
          nameLocation: 'center',
          data: []
          // data: ['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08', '2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16', '2019-01-17', '2019-01-18', '2019-01-19', '2019-01-20', '2019-01-21', '2019-01-22', '2019-01-23', '2019-01-24', '2019-01-25', '2019-01-26', '2019-01-27', '2019-01-28', '2019-01-29', '2019-01-30']
        },
        // y坐标轴
        yAxis: {
          type: 'value',
          show: true,
          offset: 15,
          // 坐标轴名字
          name: '单位（元）',
          // 名字和坐标轴上下间距
          nameGap: 30,
          // 名字样式
          nameTextStyle: {
            color: '#666',
            fontSize: 10,
            fontFamily: 'Helvetica',
            align: 'left',
            padding: [0, 50, 0, 0]
          },
          splitNumber: 5,
          // 坐标轴线
          axisLine: {
            show: false
          },
          // 坐标轴刻度
          axisTick: {
            show: false
          },
          // 坐标轴刻度标签
          axisLabel: {
            show: true,
            formatter: (value, index) => {
              return numeral(value).format('0,0')
            },
            color: '#666',
            fontSize: 12,
            fontFamily: 'Helvetica'
          },
          // 分割线
          splitLine: {
            show: true,
            color: '#E5E5E5'
          },
          // 坐标点
          axisPointer: {
            show: false,
            label: {
              show: false
            }
          },
          scale: true
        },
        // hover提示框
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            // 自动吸附到点
            snap: true
          },
          formatter: this.tooltipFormat,
          backgroundColor: aibank ? aibankColor : '#EC4C42',
          padding: 15,
          // 浮层字体
          textStyle: {
            color: '#fff',
            fontFamily: 'Helvetica',
            fontSize: 12
          },
          // 额外的浮层样式
          extraCssText: 'box-shadow: 0 5px 13px 4px rgba(237, 97, 88, 0.23)'
        },
        series: [{
          data: [],
          // data: [100000, 100112, 100423, 100400, 100500, 100630, 100900, 101100, 101230, 101300, 101320, 101400, 101600, 102000, 103000, 103500, 140000, 150000, 155000],
          type: 'line',
          // 数据圆点类型
          symbol: 'emptyCircle',
          showSymbol: false,
          // 数据圆点大小
          // symbolSize: 1,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0, color: aibank ? aibankColor : '#EC4C42'
                },
                {
                  offset: 1, color: aibank ? aibankColor : '#C9281E'
                }
              ]
            }
          }
        }]
      }

      // 绘制图表
      this.echartsInstance.setOption(options)
    },
    // async updateData() {
    //   const company = this.$store.getters['company/defaultCompany']
    //   const { id } = company
    //   const { data, success } = await this.$api.historyProfitTotal(null, null, id)
    //   if (success) {
    //     this.data = data || []
    //   }
    //   else {
    //     this.data = []
    //   }
    //   this.updateEcharts()
    // },
    updateEcharts() {
      const xData = this.xData
      const yData = this.yData
      const aibank = this.aibank
      const options = {
        xAxis: {
          data: xData
        },
        series: [{
          data: yData,
          type: 'line',
          // 数据圆点类型
          symbol: 'emptyCircle',
          showSymbol: false,
          // 数据圆点大小
          // symbolSize: 1,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0, color: aibank ? aibankColor : '#EC4C42'
                },
                {
                  offset: 1, color: aibank ? aibankColor : '#C9281E'
                }
              ]
            }
          }
        }]
      }
      this.echartsInstance.setOption(options)
    }
  }
}
</script>
