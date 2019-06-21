<template>
  <div class="jd-title">
    <h3>{{title}}<span>{{subTitle}}</span></h3>
    <slot></slot>
  </div>
</template>
<script>
/**
 * @prop { String } title 标题
 * @prop { String } subTitle 副标题
 */
export default {
  name: 'JdTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-title {
  h3 {
    font-weight: 400;
    color: $black-deep;
    font-size: 18px;
    margin: 24px 0 15px 24px;
    span {
      color: $black;
      font-size: 12px;
      margin-left: 10px;
    }
  }
}
</style>
