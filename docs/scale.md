# 缩放组件

## 作用
- 解决`font-size: 10px`的奇葩需求

## 依赖
- 无

## 使用
```bash
# js
import { Scale } from 'vue-jd-ui'
# html
Vue.use(Scale)
```

## 例子
- 缩放文本
::: 缩放文本使用示例
```html
<template>
  <jd-scale :text="text" :multiple="multiple">
  </jd-scale>
</template>
<script>
export default {
  data() {
    return {
      multiple: 10/12,
      text: '缩小后的文本内容'
    }
  }
}
</script>
```

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text     | 文本      | string | - | '' |
| multiple |   缩放倍数 | number | - | '' |

## Emit
- 无
