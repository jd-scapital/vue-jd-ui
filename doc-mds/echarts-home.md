# 资产收益图表

## 功能

基于echarts进行的封装，实现资产收益展示功能

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <jd-echarts-home :xData="xData" :yData="yData" :tooltipFormat="tooltipFormat"></jd-echarts-home>
  </div>
  <div>
    <jd-echarts-home aibank :xData="xData" :yData="yData" :tooltipFormat="tooltipFormat"></jd-echarts-home>
  </div>
</template>
<script>
export default {
  data() {
    return {
      xData: ['2019-09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07', '09-08', '09-09', '09-10'],
      yData: [1, 2, 3, 3, 1, 4, 2, 6, 3, 4]
    }
  },
  methods: {
    tooltipFormat(params, ticket, callback) {
      const data = params[0]
      const { value, dataIndex } = data
      return `value: ${value}, dataIndex: ${dataIndex}`
    }
  }
}
</script>
```

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| xData | x轴数据 | 否 | Array | 时间格式 | [] |
| yData | y轴数据 | 否 | Array | - | [] |
| aibank | 是否是aibank | 否 | Boolean | true/false | false |
| tooltipFormat | tooltip格式化 | 否 | Function | (params, ticket, callback) | - |

```js
xData: [
  new Date(),
  new Date(),
  new Date()
]
yData: [
  '123',
  '321',
  '111.00'
]
tooltipFormat: (params, ticket, callback) => {
  const data = params[0]
  const { value, dataIndex } = data
  const sumMoney = numeral(value).format('0,0.00')
  const profit = numeral(this.echartsData[dataIndex].dailyProfit).format('0,0.00')
  return `到今日累计收益：${sumMoney} 当天收益： ${profit}`
}
```

## 默认组件名

`jd-echarts-home`
