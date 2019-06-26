<template>
  <div class="tab-echarts" :class="{ 'aibank': aibank }">
    <div class="tabs">
      <ul>
        <li
          v-for="(tab, i) in tabs"
          :key="i"
          :class="{active: i === tabActive}"
          @click="tabClickHandle(i)">{{tab}}</li>
      </ul>
    </div>
    <!-- border-gray-1 -->
    <div class="echart-box">
      <div class="date">
        <ul>
          <li
            v-for="(date, i) in dateList"
            :key="i"
            :class="{active: i === dateActive}"
            @click="dateClickHandle(i)">{{date.name}}</li>
        </ul>
      </div>
      <div class="echarts-tab" ref="echartsTab">loading...</div>
    </div>
  </div>
</template>
<script>
/**
 * @prop { String } type 活期产品子类型 T0 T1
 * @event tabClickHandle tab切换触发，回调参数是当前索引
 * @event dateClickHandle 日期切换触发，回调参数是当前索引
 */
import echarts from 'echarts'
import dayjs from 'dayjs'
import numeral from 'numeral'
// import { CURRENT_T0 } from 'vue-jd-ui/src/utils/constant'
const aibankColor = '#1EA6E9'
export default {
  name: 'JdEchartsTab',
  props: {
    aibank: {
      type: Boolean,
      default: false
    },
    xData: {
      type: Array,
      default: () => ([])
    },
    yData: {
      type: Array,
      default: () => ([])
    },
    tabActive: {
      type: Number,
      default: 0
    },
    dateActive: {
      type: Number,
      default: 0
    }
    // X轴日期列表
    // days: {
    //   type: Array,
    //   default: () => ['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08', '2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16', '2019-01-17', '2019-01-18', '2019-01-19', '2019-01-20', '2019-01-21', '2019-01-22', '2019-01-23', '2019-01-24', '2019-01-25', '2019-01-26', '2019-01-27', '2019-01-28', '2019-01-29', '2019-01-30']
    // },
    // Y轴数据
    // data: {
    //   type: Array,
    //   default: () => [3.4, 3.4, 3.5, 3.4, 3.6, 4.1, 3.9, 4.12, 3.31, 4.3, 3.51, 3.14, 4.51, 4.32, 3.92, 3.26, 4.19, 4.2, 4.3]
    // }
  },
  data() {
    return {
      echartsInstance: null,
      // tabActive: 0,
      tabs: [
        '七日年化',
        '万份收益'
      ],
      // dateActive: 0,
      dateList: [
        {
          name: '近一周'
        },
        {
          name: '近一个月'
        },
        {
          name: '近三个月'
        }
      ]
      // 当前日期
      // currentDate: dayjs().subtract(20, 'day').format('YYYY-MM-DD'),
      // rateList: []
    }
  },
  watch: {
    xData(val) {
      this.updateDate(val)
    },
    yData(val) {
      this.updateData(val)
    }
  },
  mounted() {
    this.init()
    if (this.xData.length && this.yData.length) {
      this.updateDate(this.xData)
      this.updateData(this.yData)
    }
  },
  methods: {
    init() {
      // 初始化图表样式
      this.initEcharts()
    },
    // tab切换
    tabClickHandle(index) {
      // this.tabActive = index
      let options = null
      switch (index) {
        case 0:
        // 图表参数变更
          options = {
            yAxis: {
              axisLabel: {
                formatter: (value, i) => {
                  return numeral(value).format('0.00') + '%'
                }
              }
            },
            tooltip: {
              formatter: (params, ticket, callback) => {
                const data = params[0]
                const { value } = data
                const sumMoney = `${value}%`
                return `当天七日年化：${sumMoney}`
              }
            }
          }
          break
        case 1:
        // 图表参数变更
          options = {
            yAxis: {
              axisLabel: {
                formatter: (value, i) => {
                  return numeral(value).format('0.0000')
                }
              }
            },
            tooltip: {
              formatter: (params, ticket, callback) => {
                const data = params[0]
                const { value } = data
                const sumMoney = numeral(value).format('0.0000')
                return `万份收益(元)：${sumMoney}`
              }
            }
          }
          break
        default:
          break
      }
      this.echartsInstance.setOption(options)
      this.dateClickHandle(0)
      this.$emit('tabClickHandle', index)
    },
    // 日期切换
    dateClickHandle(index) {
      // this.dateActive = index
      this.$emit('dateClickHandle', index)
      // switch (index) {
      //   case 0: // 一周
      //     this.updateRateList(7)
      //     break
      //   case 1: // 一个月
      //     this.updateRateList(30)
      //     break
      //   case 2: // 三个月
      //     this.updateRateList(90)
      //     break
      //   default:
      //     this.updateRateList(7)
      //     break
      // }
    },
    initEcharts() {
      const echartsTab = this.$refs.echartsTab
      this.echartsInstance = echarts.init(echartsTab, null, { width: 470, height: 230 })
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
            // interval: (index, value) => {
            //   // 第一天
            //   if (index === 0) {
            //     return true
            //   } // 15日
            //   else if (index === 14) {
            //     return true
            //   } // 最后一天
            //   else if (index === 29) {
            //     return true
            //   }
            //   else {
            //     return false
            //   }
            // },
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
        },
        // y坐标轴
        yAxis: {
          type: 'value',
          // type: 'category',
          show: true,
          interval: 1,
          offset: 0,
          // 坐标轴线
          axisLine: {
            show: false
          },
          // 坐标轴刻度
          axisTick: {
            show: false
          },
          scale: true,
          // 坐标轴刻度标签
          axisLabel: {
            show: true,
            formatter: (value, index) => {
              return numeral(value).format('0.00') + '%'
            },
            color: '#666',
            fontSize: 10,
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
          }
        },
        // hover提示框
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            // 自动吸附到点
            snap: true
          },
          formatter: (params, ticket, callback) => {
            const data = params[0]
            const { value } = data
            const sumMoney = `${value}%`
            return `当天七日年化：${sumMoney}`
          },
          backgroundColor: aibank ? aibankColor : '#EC4C42',
          padding: 6,
          // 浮层字体
          textStyle: {
            color: '#fff',
            fontFamily: 'Helvetica',
            fontSize: 12
          },
          // 额外的浮层样式
          extraCssText: aibank ? 'box-shadow: 0 5px 13px 4px rgba(64, 158, 255, 0.23)' : 'box-shadow: 0 5px 13px 4px rgba(237, 97, 88, 0.23)'
        },
        series: [{
          data: [],
          type: 'line',
          // 数据圆点类型
          symbol: 'emptyCircle',
          // 数据圆点不显示
          showSymbol: false,
          // 折线的样式
          lineStyle: {
            width: 1,
            color: aibank ? aibankColor : '#EC4C42'
          }
        }]
      }
      // 绘制图表
      this.echartsInstance.setOption(options)
    },
    // 初始化图表日期（x轴）
    updateDate(xData) {
      const options = {
        xAxis: {
          data: xData
        }
      }
      this.echartsInstance.setOption(options)
    },
    // 初始化图表数据（y轴）
    updateData(yData) {
      const aibank = this.aibank
      const options = {
        series: [{
          data: yData,
          type: 'line',
          // 数据圆点类型
          symbol: 'emptyCircle',
          // 数据圆点不显示
          showSymbol: false,
          // 折线的样式
          lineStyle: {
            width: 1,
            color: aibank ? aibankColor : '#EC4C42'
          }
        }]
      }
      this.echartsInstance.setOption(options)
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-echarts {
  .tabs {
    ul {
      display: flex;
      user-select: none;
      border-bottom: 1px solid $border-gray-1;
      li {
        color: $gray-2;
        font-size: 12px;
        width: 104px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        background-color: $gray-deep;
        margin-right: 2px;
        border: 1px solid $gray-deep;
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        user-select: none!important;
        &.active {
          position: relative;
          background-color: $white;
          color: $black;
          border-bottom-color: transparent;
          &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: $white;
            z-index: 1;
          }
        }
      }
    }
  }
  .echart-box {
    position: relative;
    width: 526px;
    height: 237px;
    border-left: 1px solid $gray-deep;
    border-right: 1px solid $gray-deep;
    border-bottom: 1px solid $gray-deep;
    .date {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 16px;
      padding-left: 24px;
      ul {
        display: flex;
        li {
          cursor: pointer;
          padding: 0 10px;
          height: 20px;
          line-height: 20px;
          color: $gray;
          font-size: 12px;
          text-align: center;
          margin-right: 6px;
          user-select: none!important;
          &.active {
            background-color: $red-1;
            color: $white;
          }
        }
      }
    }
    .echarts-tab {
      height: 200px;
      width: 470px;
      margin: 0 auto;
    }
  }
}
.tab-echarts.aibank {
  .echart-box {
    .date {
      ul {
        li {
          &.active {
            background-color: #70BDE3;
          }
        }
      }
    }
  }
}
</style>
