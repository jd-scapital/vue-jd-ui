<template>
  <div class="tooltip" v-click-outside="clickOutSideHandle">
    <el-tooltip
      v-model="show"
      placement="top"
      effect="light"
      :manual="clickEmit"
      popper-class="tooltip-popper">
      <div slot="content">
        <slot></slot>
      </div>
      <i v-if="isAttention && !slotIcon" @click.stop="clickHandle" class="iconfont iconpop_hint" :class="{active: show}"></i>
      <i v-else-if="!slotIcon" @click.stop="clickHandle" class="iconfont iconyiwen" :class="{active: show}"></i>
      <div v-else>
        <slot name="icon"></slot>
      </div>
    </el-tooltip>
  </div>
</template>
<script>
/**
 * @prop { String } type @type attention 叹号形式 @type doubt 问号形式
 * @prop { Boolean } slotIcon 是否使用自定义icon内容
 * @prop { Boolean } clickEmit 是否要点击显示和隐藏
 * @template slot hover显示的内容
 * @template slot:icon 当 slotIcon 为true时要展示的内容
 */
import elTooltip from '../el-tooltip'

export default {
  name: 'JdTooltip',
  components: {
    elTooltip
  },
  props: {
    type: {
      type: String,
      default: 'attention'
    },
    slotIcon: {
      type: Boolean,
      default: false
    },
    clickEmit: {
      tpye: Boolean,
      default: false
    }
  },
  computed: {
    isAttention() {
      return this.type === 'attention'
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    clickHandle() {
      if (!this.clickEmit) {
        return false
      }
      this.show = !this.show
    },
    clickOutSideHandle() {
      this.show = false
    }
  }
}
</script>
