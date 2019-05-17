# 输入框

## 功能

实现文本内容输入

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| value/v-model | 值 | 是 | String/Number | - | - |
| type | 按钮类型 | 否 | String | submit(带提交按钮)/input | submit |
| placeholder | 输入框占位文本 | 否 | String | - | - |
| allInText | 附加操作按钮显示文案(type为submit时生效) | 否 | String | - | - |
| confirmText | 确认按钮的文案(type为submit时生效) | 否 | String | - | - |
| transformText | 转换金额的文案 | 否 | String | - | 汇款金额大写 |
| disabled | 禁用 | 否 | Boolean | true/false | false |
| warning | 错误提示 | 否 | Object | - | {show: false, text: ''} |


## event

- `all-in-handle`: 点击附加操作按钮触发 （type为submit）
- `confirm-handle`: 点击确认按钮触发 （type为submit）
- `double-handle`: 双击触发 （type为submit）
- `change-handle`: input值改变时触发 （type为submit）, 回调参数(value)

## 默认组件名

`jd-input`

## 样式

- `submit`
![input-submit](./img/input-submit.png)
- `input`
![input-input](./img/input-input.png)
