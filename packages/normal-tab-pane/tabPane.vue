<template>
  <div class="jd-normal-tab-pane" v-show="active">
    <slot></slot>
  </div>
</template>
<script>
/**
 * @file components/common/tab/tabPane.vue
 * @description tab的面板
 * @createTime 2019年04月10日14:10:59
 */
export default {
  name: 'JdNormalTabPane',
  props: {
    // 标签名
    label: {
      type: String,
      default: ''
    },
    // 名称(判断激活tab用)
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    active() {
      const labels = this.$parent.labels || []
      const activeLabel = labels.find(label => label.active) || {}
      return activeLabel.name === this.name
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-normal-tab-pane {}
</style>
