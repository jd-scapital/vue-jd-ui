# 产品收益图表

## 功能

产品的历史收益，分为七日年化和万份收益

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <jd-echarts-tab
      :xData="xData"
      :yData="yData"
      :tabActive="tabActive"
      :dateActive="dateActive"
      @tabClickHandle="tabClickHandle"
      @dateClickHandle="dateClickHandle"></jd-echarts-tab>
  </div>
  <div>
    <jd-echarts-tab
      aibank
      :xData="xData"
      :yData="yData"
      :tabActive="tabActive"
      :dateActive="dateActive"
      @tabClickHandle="tabClickHandle"
      @dateClickHandle="dateClickHandle"></jd-echarts-tab>
  </div>
</template>
<script>
export default {
  data() {
    return {
      xData: ['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07', '09-08', '09-09', '09-10'],
      yData: [1, 2, 3, 3, 1, 4, 2, 6, 3, 4],
      tabActive: 0,
      dateActive: 0
    }
  },
  methods: {
    tabClickHandle(index) {
      this.tabActive = index
    },
    dateClickHandle(index) {
      this.dateActive = index
    }
  }
}
</script>
```

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| xData | x轴数据 | 否 | Array | - | [] |
| yData | y轴数据 | 否 | Array | — | [] |
| tabActive | 当前选中的tab类型 | 否 | Number | - | 0 |
| dateActive | 当前选中的时间分段类型 | 否 | Number | - | 0 |

## event

- `tabClickHandle`: 切换tab后触发的事件，回调参数(index)当前选中的索引
- `dateClickHandle`: 切换时间后触发的事件，回调参数(index)当前选中的索引

## 默认组件名

`jd-echarts-tab`
