# 输入框

## 功能

实现文本内容输入

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <jd-input
      v-model="value"
      placeholder="输入的是字符串"
      allInText="额外操作"
      confirmText="确认"
      transformText="金额转换"
      @all-in-handle="allInHandle"
      @confirm-handle="confirmHandle"
      @double-handle="doubleHandle"
      @change-handle="changeHandle"></jd-input>
    <jd-input
      aibank
      v-model="value"
      placeholder="输入的是字符串"
      allInText="额外操作"
      confirmText="确认"
      transformText="金额转换"
      @all-in-handle="allInHandle"
      @confirm-handle="confirmHandle"
      @double-handle="doubleHandle"
      @change-handle="changeHandle"></jd-input>
  </div>
  <div>
    <jd-input
      v-model="value"
      type="input"
      placeholder="输入的是字符串"
      transformText="金额转换1"
      @double-handle="doubleHandle"
      @change-handle="changeHandle"></jd-input>
    <jd-input
      aibank
      v-model="value"
      type="input"
      placeholder="输入的是字符串"
      transformText="金额转换1"
      @double-handle="doubleHandle"
      @change-handle="changeHandle"></jd-input>
  </div>
  <div>
    <jd-input
      v-model="value"
      disabled
      placeholder="输入的是字符串"
      allInText="额外操作"
      confirmText="确认"
      transformText="金额转换"
      @all-in-handle="allInHandle"
      @confirm-handle="confirmHandle"
      @double-handle="doubleHandle"
      @change-handle="changeHandle"></jd-input>
  </div>
  <div>
    <jd-input
      v-model="value"
      disabled
      type="input"
      placeholder="输入的是字符串"
      transformText="金额转换1"
      @double-handle="doubleHandle"
      @change-handle="changeHandle"></jd-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    allInHandle() {
      console.log('额外操作')
    },
    confirmHandle() {
      console.log('确认按钮')
    },
    doubleHandle() {
      console.log('双击输入框')
    },
    changeHandle(val) {
      console.log('输入值变动', val)
    }
  }
}
</script>
```

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| value/v-model | 值 | 是 | String/Number | - | - |
| type | 按钮类型 | 否 | String | submit(带提交按钮)/input | submit |
| placeholder | 输入框占位文本 | 否 | String | - | - |
| allInText | 附加操作按钮显示文案(type为submit时生效) | 否 | String | - | - |
| confirmText | 确认按钮的文案(type为submit时生效) | 否 | String | - | - |
| transformText | 转换金额的文案 | 否 | String | - | 汇款金额大写 |
| disabled | 禁用 | 否 | Boolean | true/false | false |
| warning | 错误提示 | 否 | Object | - | {show: false, text: ''} |


## event

- `all-in-handle`: 点击附加操作按钮触发 （type为submit）
- `confirm-handle`: 点击确认按钮触发 （type为submit）
- `double-handle`: 双击触发 （type为submit）
- `change-handle`: input值改变时触发 （type为submit）, 回调参数(value)

## 默认组件名

`jd-input`

## 样式

- `submit`
![input-submit](./img/input-submit.png)
- `input`
![input-input](./img/input-input.png)
