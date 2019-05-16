# 步骤组件

## 作用
- 自定义设计的步骤ui

## 依赖
- `jd-scale`

## 使用
```bash
# js
import { Step } from 'vue-jd-ui'
Vue.use(Step)
# html
<jd-step></jd-step>
```

## props
- `type`: 类型
  - `middle`: 稍等大点的
  - `small`: 小点的
- `steps`: 步骤
  - ` [ { index: 1, text: '企业信息', active: true } ]`
  - index: 序号
  - text: 标题文本
  - active: 是否激活
- `step`: 当前阶段(根据index取值, 第一个是`1`, 而非`0`)

## emit
