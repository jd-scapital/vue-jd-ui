# tab切换

## 功能

tab切换

## props

| 参数 | 说明 | 必填 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| value/v-model | 当前选中 | 否 | String/Number | - | 0 |
| width | tab的宽度 | 否 | String | — | 340px |
| tabs | 展示的tab | 否 | Array | - | [] |

```js
tabs: [
  {
    label: '', // 显示的文案
    name: '' // 对应显示的tab的name 赋给 value
  }
]
```

## event

- `handle-click`: 点击后触发的事件,回调参数(tab, event)

## 默认组件名

`jd-tab`

## 样式

- `default`
![tab](./img/tab.png)
