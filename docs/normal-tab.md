# tab容器

## 作用
- tab切换

## 依赖
- 无

## 使用
```bash
# js
import { NormalTab } from 'vue-jd-ui'
Vue.use(NormalTab)
# html
<!-- data: { activeName: 'operate' } -->
<jd-normal-tab v-model="activeName"
  @change-tab="changeTab">
  <jd-normal-tab-pane label="操作手册" name="operate">
  </jd-normal-tab-pane>
  <jd-normal-tab-pane label="帮助手册" name="help">
  </jd-normal-tab-pane>
</jd-normal-tab>
```

## props

## emit
- `change-tab`: tab更换
  - `label => {}`
