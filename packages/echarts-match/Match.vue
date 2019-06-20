<template>
  <div class="echarts-match" ref="echartsMatch">loading...</div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'JdEchartsMatch',
  props: {
    value: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      echartsInstance: null,
      // 当前选中索引
      index: 0
      // data: [
      //   {
      //     value: 200,
      //     name: 'T+0'
      //   },
      //   {
      //     value: 1000,
      //     name: 'T+1'
      //   }
      // ]
    }
  },
  watch: {
    value(val) {
      this.highlightEchart(val)
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      const echartsMatch = this.$refs.echartsMatch
      this.echartsInstance = echarts.init(echartsMatch, null, { width: 144, height: 144 })
      const options = {
        title: {
          text: '30%',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#999',
            fontSize: 24,
            fontFamily: 'ArialMT',
            fontWeight: 400
          }
        },
        series: [
          {
            name: '资产配比',
            type: 'pie',
            radius: ['82%', '100%'],
            avoidLabelOverlap: false,
            // 选中动画
            hoverAnimation: false,
            // 鼠标选中无效
            silent: true,
            labelLine: {
              show: false
            },
            // 环形默认颜色
            itemStyle: {
              color: '#F0F0F0'
            },
            // 选中
            emphasis: {
              label: {
                show: false
              },
              // 选中样式
              itemStyle: {
                color: '#EC4C42'
              }
            },
            // 数据
            data: this.data
          }
        ]
      }
      // 绘制图表
      this.echartsInstance.setOption(options)
      this.highlightEchart(this.value)
    },
    // 选择高亮
    highlightEchart(index = 0) {
      // 当前选中数据
      const currentData = this.data[index]
      // 当前数值
      const currentValue = currentData.value
      // 总计
      const sumAmount = this.data.reduce((accumulator, current) => {
        if (accumulator.value) {
          return accumulator.value + current.value
        }
        return accumulator + current.value
      })
      // 当前百分比
      const percent = Number(currentValue / sumAmount * 100).toFixed()

      // 取消选中
      this.echartsInstance.dispatchAction({
        type: 'downplay',
        dataIndex: this.index
      })
      // 修改显示百分比
      this.echartsInstance.setOption({
        title: {
          text: `${percent}%`
        }
      })
      // 选中
      this.echartsInstance.dispatchAction({
        type: 'highlight',
        dataIndex: index
      })
      this.index = index
    }
  }
}
</script>
<style lang="scss" scoped>
.echarts-match {
  /* height: 144px; */
  height: 100%;
  /* width: 144px;
  height: 144px; */
}
</style>
