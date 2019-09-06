# 按钮

## 功能

实现点击或者跳转页面

## 示例

- type

::: 基础使用示例

```html
<template>
  <div>
    <span>csbank</span>
    <jd-button style="padding: 0 20px;">默认</jd-button>
    <jd-button style="padding: 0 20px;" type="fill">填充</jd-button>
    <jd-button style="padding: 0 20px;" type="text">无边框</jd-button>
  </div>
  <div style="padding-top: 20px;">
    <span>aibank</span>
    <jd-button style="padding: 0 20px;" aibank>默认</jd-button>
    <jd-button style="padding: 0 20px;" aibank type="fill">填充</jd-button>
    <jd-button style="padding: 0 20px;" aibank type="text">无边框</jd-button>
  </div>
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

- 禁用

::: 基础使用示例

```html
<template>
  <div>
    <span>csbank</span>
    <jd-button
    style="padding: 0 20px;"
    disabled
    >按钮</jd-button>
  </div>
  <div style="padding-top: 20px;">
    <span>csbank</span>
    <jd-button
    style="padding: 0 20px;"
    disabled
    aibank
    >按钮</jd-button>
  </div>
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

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| type | 按钮类型 | 否 | String | fill(有填充)/none(无填充)/text(无边框) | none |
| to | 路由跳转，有该属性时为进行路由跳转 | 否 | String/Object(vue-router规则) | — | — |
| disabled | 禁用状态 | 否 | Boolean | true/false | false |
| aibank | 是否是aibank | 否 | Boolean | true/false | false |

## event

- `click`: 点击后触发的事件

## slot

按钮的内容

## 默认组件名

`jd-button`

