# 额外提示

## 功能

鼠标移入，显示额外提示

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <jd-tooltip>123121233</jd-tooltip>
  </div>
  <div>
    <jd-tooltip type="doubt">123121233</jd-tooltip>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
```

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| type | 展示形式 | 否 | String | attention(叹号形式)/doubt(问号形式) | attention |
| slotIcon | 是否使用自定义icon内容 | 否 | Boolean | true/false | false |
| clickEmit | 是否要点击显示和隐藏 | 否 | Boolean | true/false | false |

## slot

- `slot`: hover显示的内容
- `slot:icon`: 当 slotIcon 为true时要展示的内容

## 默认组件名

`jd-tooltip`
