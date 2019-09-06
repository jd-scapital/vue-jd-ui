# 选择器

## 功能

下拉选择

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <jd-select v-model="value" :selectOptions="selectOptions"></jd-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      selectOptions: [
        {
          label: 'one',
          value: '1'
        },
        {
          label: 'two',
          value: '2'
        },
        {
          label: 'three',
          value: '3'
        }
      ]
    }
  }
}
</script>
```

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| value/v-model | 选中的值 | 否 | String | - | - |
| selectOptions | 下拉选择项 | 否 | Array | — | [] |

```js
selectOptions: [
  {
    label: '',
    value: ''
  }
]
```

## methods

- `clearHandle`: 清空选中的值

## 默认组件名

`jd-select`
