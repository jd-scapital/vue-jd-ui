<template>
  <div class="title">
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
