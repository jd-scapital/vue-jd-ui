# 弹框

## 作用
- 通用弹框组件, 并支持各种diy

## 依赖
- `el-dialog`
- `jd-button`

## 使用
```bash
# js
import { Alter } from 'vue-jd-ui'
Vue.use(Alter)
# html
<jd-alter :show="isShow"></jd-alter>
```

## props
- `show`: 展示弹框与否
- `title`: 弹框左上角标题
  - 为空, 则不展示弹框header
- `hasCancelButton`: 是否有取消按钮
- `cancelText`: 取消文本
- `buttonText`: 弹框右下角主按钮文本的文字
  - 为空, 则不展示弹框footer
- `showClose`: 是否展示关闭按钮
- `width`: 弹框宽度
- `closeOnClickModal`: 是否能点击背景关闭弹框

## emit
- `click`: 弹框右下角主按钮点击事件
- `cancel`: 取消按钮点击事件
- `close-handle`: 弹框关闭
