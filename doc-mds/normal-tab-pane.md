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
| label     | tab的标签     | string | - | - |
| name     | tab的名称(tab-pane选中的值)  | string | - | - |

## Emit
