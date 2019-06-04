## 步骤组件

### 作用
- 自定义设计的步骤ui

### 依赖
- `jd-scale`

## 使用
::: 基础使用示例
```html
<template>
  <jd-step
    :type="type"
    :steps="steps"
    :step="step">
  </jd-step>
</template>
<script>
export default {
  data() {
    return {
      // 当前阶段(根据index取值, 第一个是1, 而非0
      step: 1,
      // 类型
      type: 'small',
      // 步骤
      steps: [
        {
          // 序号
          index: 1,
          // 标题文本
          text: '企业信息',
          // 是否激活
          active: true
        },
        {
          index: 2,
          text: '法人信息',
          active: false
        }
      ]
    }
  }
}
</script>
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type     | 类型           | string | middle/small | small |
| steps    | 步骤           | array  | - | [] |
| step     | 当前阶段        | number | - | 1  |
