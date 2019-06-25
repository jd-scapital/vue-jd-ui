# tab类型的swiper

## 作用
- 自定义的swiper

## 依赖
- `swiper`

## 使用
```bash
# js
import { TabSwiper } from 'vue-jd-ui'
Vue.use(TabSwiper)
# data
banners: [
  {
    id: 1,
    title: '产品介绍',
    active: true
  },
  {
    id: 2,
    title: '风险等级',
    active: false
  }
]
# html
<jd-tab-swiper
  :height="360"
  :banners.sync="banners">
  <div class="banner-item" slot="0">产品介绍内容</div>
  <div class="banner-item" slot="1">风险等级内容</div>
</jd-tab-swiper>
```

## 例子
- 展示当前step
::: 设置是否展示当前step的示例用法
```html
<template>

</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
```

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height    | 高度           | string | - | '' |
| banners   | banners的数据   | array | - | [] |

## Emit
- `slideChange`: slide切换事件
  - `banerItem => {}`: 回传的是banners中的激活数据
