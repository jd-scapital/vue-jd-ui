# 折叠面板

## 功能

点击下拉展示更多内容

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <p>一直存在...没有标题版</p>
    <jd-collapse>
      隐藏显示的...
    </jd-collapse>
    <p>一直存在...有标题版</p>
    <jd-collapse type="title" title="这是标题">
      隐藏显示的...
    </jd-collapse>
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
| type | 有无标题 | 否 | String | noTitle(无标题)/title(有标题) | noTitle |
| open | 是否默认展开 | 否 | Boolean | true/false | false |
| title | 标题（当 type 为 title 时） | 否 | String | - | - |

## 默认组件名

`jd-collapse`
