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

## props
- `height`: 高度
- `banners`: banners的数据

## emit
- `slideChange`: slide切换事件
  - `banerItem => {}`: 回传的是banners中的激活数据
