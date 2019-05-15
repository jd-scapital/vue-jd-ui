<template>
  <span class="jd-span">
    <span class="wrap">
      {{text}}
    </span>
  </span>
</template>
<script>
/**
 * @file common/Span.vue
 * @description label标签组件
 * @createTime 2019年03月18日11:57:32
 */
export default {
  name: 'JdSpan',
  props: {
    // 展示的标签内容
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
