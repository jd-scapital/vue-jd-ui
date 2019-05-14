<template>
  <span class="jd-scale" :style="scaleCss">
    {{text}}
  </span>
</template>
<script>
/**
 * @file components/common/scale.vue
 * @description 缩放组件, 例如10px文本
 * @createTime 2019年03月21日10:45:14
 */
export default {
  name: 'JdScale',
  props: {
    // 缩放文本
    text: {
      type: String,
      default: ''
    },
    // 缩放倍数
    multiple: {
      type: Number,
      default: 1
    }
  },
  computed: {
    scaleCss() {
      return `transform: scale(${this.multiple});display: inline-block;`
    }
  }
}
</script>
