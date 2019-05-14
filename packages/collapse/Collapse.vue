<template>
  <div class="collapse-box">
    <div v-if="type === 'title'" class="collapse-title">
      <div class="collapse">
        <p @click="toggle()">
          <span>{{title}}</span>
          <i class="iconfont iconarrowleft" :class="{active: active}"></i>
        </p>
      </div>
      <collapse-transition>
        <div v-show="active">
          <slot></slot>
        </div>
      </collapse-transition>
    </div>
    <div v-else class="no-collapse-title">
      <collapse-transition>
        <div v-show="active">
          <slot></slot>
        </div>
      </collapse-transition>
      <div class="collapse">
        <p @click="toggle()">
          <span v-show="active">收起详情</span><i class="iconfont iconarrowleft" :class="{active: active}" ></i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @prop { String } type noTitle(无标题) title(有标题)
 * @prop { Boolean } open 是否默认展开
 * @prop { String } title 标题（当 type 为 title 时）
 */
import CollapseTransition from 'jd-ui/src/transitions/collapse-transition'

export default {
  name: 'JdCollapse',
  components: {
    CollapseTransition
  },
  props: {
    type: {
      type: String,
      default: 'noTitle'
    },
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: this.open
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
