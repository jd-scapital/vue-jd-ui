# tab的pane组件

## 作用
- pane组件内容包裹

## 依赖
- 无

## 使用
```bash
# js
import { NormalTabPane } from 'vue-jd-ui'
Vue.use(NormalTabPane)
# html
<jd-nomral-tab-pane :label="'tab1'" :name="'name1'"></jd-nomral-tab-pane>
```

## props
- `label`: pane标签名
- `name`: pane名称

## emit
