# 输入框下拉框

## 作用
- 输入框样式的下拉框

## 依赖
- 无

## 使用
```bash
# js
import { NormalInputSelect } from 'vue-jd-ui'
Vue.use(NormalInputSelect)
# html
<normal-input-select
  :show="isShow"
  :options="[{name: '', value: ''}]">
</normal-input-select>
```

## props
- `show`: 是否展示
- `options`: 选项列表

## emit
- `select`: 选中的值回传
