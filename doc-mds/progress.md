# 过程条

## 功能

过程的步骤显示

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <span>csbank</span>
    <jd-progress v-model="active1" :progress="progress"></jd-progress>
  </div>
  <div>
    <span>aibank</span>
    <jd-progress v-model="active2" aibank :progress="progress"></jd-progress>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active1: 1,
      active2: 2,
      progress: [
        {
          name: '第一步',
          time: '2019-06-11'
        },
        {
          name: '第二步',
          // time: '2019-06-12'
        },
        {
          name: '第三步',
          time: '2019-06-13'
        },
        {
          name: '第四步',
          time: '2019-06-14'
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
| value/v-model | 当前到第几步 | 是 | Number | - | 1 |
| progress | 进度条 | 是 | Array | — | [] |

```js
progress: [
  {
    name: '', // 显示文字
    time: '' // 显示时间
  }
]
```

## 默认组件名

`jd-progress`
