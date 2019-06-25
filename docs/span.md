# 标签

## 作用
- 统一标签样式

## 依赖
- 无

## 使用
```bash
# js
import { Span } from 'vue-jd-ui'
Vue.use(Span)
# html
<jd-span :text="label"></jd-span>
```

## 例子
- 基础示例
::: 基础使用示例
```html
<template>
  <jd-span :text="text"></jd-span>
</template>
<script>
export default {
  data() {
    return {
      text: '123'
    }
  }
}
</script>
```

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text     | 文本     | string | - | '' |

## Emit
- 无
