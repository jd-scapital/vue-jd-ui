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

## 例子
- 基础示例
::: 基础使用示例
```html
<template>
  <jd-normal-tab v-model="activeName"
    @change-tab="changeTab">
    <jd-normal-tab-pane v-for="(pane, key) in panes"
      :key="key"
      :label="pane.label"
      :name="pane.name">
      <div v-if="key === 0">tabOne</div>
      <div v-if="key === 1">tabTwo</div>
    </jd-normal-tab-pane>
  </jd-normal-tab>
</template>
<script>
export default {
  data() {
    return {
      activeName: '',
      panes: [
        {
          label: '操作手册',
          name: 'operate'
        },
        {
          label: '帮助手册',
          name: 'help'
        }
      ]
    }
  },
  methods: {
    changeTab(option) {
      console.log(option)
    }
  }
}
</script>
```

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value     | 当前的tab     | string | - | - |

## Emit
- `change-tab`: tab更换
  - `label => {}`
