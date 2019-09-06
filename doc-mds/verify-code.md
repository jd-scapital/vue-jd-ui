# 验证码

## 功能

验证码发送和输入

## 示例

::: 基础使用示例

```html
<template>
  <div>
    <jd-verify-code v-model="code" :phone="phone" type="type" placeholder="请输入验证码" :codePromise="codePromise"></jd-verify-code>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: '',
      phone: '12311112222',
      codePromise: () => {}
    }
  }
}
</script>
```

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| value/v-model | code码 | 否 | String/Number | - | - |
| phone | 手机号 | 是 | String | — | — |
| disabled | 禁用状态 | 否 | Boolean | true/false | false |
| isCs | 是否是发送长行验证码 | 否 | true/false | — | false |
| type | 短信验证码的模板类型, 当 isCs: false 时为必填 | 否 | String | — | — |
| placeholder | 文本占位符 | 否 | String | — | 请输入验证码 |
| time | 倒计时时间，单位：秒 | 否 | Number | — | 30 |
| codePromise | 发送验证码的请求 | 否 | Function | — | () => {} |

## event

- `send-handle`: 点击发送按钮时触发
- `get-certificate`: 发送获取验证码的请求成功后用来校验的凭证，回调参数(traceId)

## slot

- `slot:warn`: 自定义提示

## methods

- `reset` 重置

## 默认组件名

`jd-verify-code`
