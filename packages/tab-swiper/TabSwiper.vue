<template>
  <div class="jd-tab-swiper" :style="`height: ${height}px;`">
    <swiper
      :options="swiperOption"
      @ready="ready">
      <slide v-for="(banner, key) in banners"
        :key="key"
        :style="`height: ${height}px;`">
        <slot :name="key"></slot>
      </slide>
    </swiper>
    <!-- page -->
    <div class="swiper-page swiper-page-tab">
      <ul :style="`width: ${bannersNum ? (54*(bannersNum-1) + 74*bannersNum) : 0}px`">
        <li v-for="(banner, key) in banners"
          :key="key"
          :class="{'active': key === activeIndex}"
          @click="tabPageClick(key)">
          {{banner.title}}
        </li>
      </ul>
    </div>
    <!-- prev button -->
    <div v-show="isShowButton && showPrev"
      :class="`swiper-button swiper-button-prev`"
      @click="prev">
      <i class="iconfont iconarrowleft"></i>
    </div>
    <!-- next button -->
    <div v-show="isShowButton && showNext"
      :class="`swiper-button swiper-button-next`"
      @click="next">
      <i class="iconfont iconarrowright"></i>
    </div>
  </div>
</template>
<script>
/**
 * @file common/TabSwiper.vue
 * @description 轮播图切换tab
 * @createTime 2019年03月13日16:06:13
 */
import { swiper, swiperSlide } from 'vue-swiper-2.x'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'JdTabSwiper',
  components: {
    swiper,
    slide: swiperSlide
  },
  props: {
    // container height
    height: {
      type: Number,
      default: 100
    },
    // banners参数数据
    banners: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否展示左右按钮
    isShowButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    bannersNum() {
      return (this.banners || []).length
    },
    activeIndex() {
      const swiper = this.swiper
      if (swiper) {
        const activeIndex = swiper.activeIndex
        const bannersLen = this.banners.length
        if (activeIndex === bannersLen + 1) {
          return 0
        }
        return activeIndex !== 0 ? activeIndex - 1 : bannersLen - 1
      }
      return 0
    }
  },
  watch: {
    banners(val) {
      console.log('banners: ', val)
    }
  },
  data() {
    const self = this
    const slideChange = swiper => {
      self.$emit('slideChange', swiper)
    }
    const swiperOption = {
      // 是否是循环的
      loop: true,
      spaceBetween: 10,
      // 开启键盘控制
      keyboardControl: true,
      onTouchEnd: slideChange,
      onSlideChangeEnd: slideChange
    }
    return {
      // swiper选项
      swiperOption,
      // swiper实例对象缓存
      swiper: null,
      showPrev: true,
      showNext: true
    }
  },
  methods: {
    ready(swiper) {
      this.swiper = swiper
    },
    prev() {
      if (this.swiper) {
        if (this.banners.length === 1) {
          return
        }
        this.swiper.swipePrev()
        this.changeBanners(this.activeIndex)
      }
    },
    next() {
      if (this.swiper) {
        if (this.banners.length === 1) {
          return
        }
        this.swiper.swipeNext()
        this.changeBanners(this.activeIndex)
      }
    },
    tabPageClick(index) {
      if (this.swiper) {
        this.changeBanners(index)
        this.swiper.swipeTo(index, 500, false)
      }
    },
    changeBanners(index) {
      this.banners.forEach((banner, bannerIndex) => {
        banner.active = bannerIndex === index
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-tab-swiper {
  position: relative;
  background-color: $white;
  .swiper-page-tab {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    ul {
      // width: 66.5%;
      height: 25px;
      padding: 0;
      margin: 0 auto;
      list-style-type: none;
      li {
        float: left;
        color: $gray;
        text-align: center;
        font-size: 12px;
        width: 74px;
        margin-right: 54px;
        padding-bottom: 3px;
        margin-top: 3px;
        position: relative;
        z-index: 2;
        cursor: pointer;
        &.active {
          color: $red;
          border-bottom: 2px solid $red;
          font-size: 14px;
          margin-top: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .swiper-button {
    position: absolute;
    cursor: pointer;
    width: 51px;
    height: 51px;
    border-radius: 50%;
    background-color: $white;
    text-align: center;
    &:hover {
      .iconfont {
        color: $black;
      }
    }
    .iconfont {
      color: $border-gray;
      font-size: 51px;
      position: relative;
      top: -10px;
    }
    &-prev {
      left: 41px;
      z-index: 2;
      background-image: none;
      &-bg {
        position: absolute;
        z-index: 1;
        width: 21.7%;
        height: 100%;
        left: 0;
        top: 0;
        background-image: linear-gradient(270deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.8) 75%,#fff);
      }
      .iconfont {
        right: 2px;
      }
    }
    &-next {
      right: 41px;
      z-index: 2;
      background-image: none;
      &-bg {
        position: absolute;
        z-index: 1;
        width: 21.7%;
        height: 100%;
        right: 0;
        top: 0;
        background-image: linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.8) 75%,#fff);
      }
      .iconfont {
        left: 2px;
      }
    }
  }
}
</style>
