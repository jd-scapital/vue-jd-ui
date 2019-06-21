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
<style lang="scss" scoped>
.jd-span {
  height: 20px;
  line-height: 20px;
  border: 1px solid rgba(102, 102, 102, .32);
  font-size: 12px;
  color: $black;
  margin-right: 8px;
  display: inline-block;
  .wrap {
    transform: scale(.833);
    line-height: 12px;
    height: 12px;
    display: inline-block;
  }
}
</style>
