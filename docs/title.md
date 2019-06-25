# 标题

## 功能

每个模块的标题

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <jd-title title="标题">
      123
    </jd-title>
  </div>
  <div>
    <jd-title title="标题" subTitle="子标题">
      321
    </jd-title>
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
| title | 标题 | 否 | String | - | - |
| subTitle | 副标题 | 否 | String | - | - |

## slot

模块内的内容

## 默认组件名

`jd-title`

## 样式

- `title`
![title](./img/title.png)

