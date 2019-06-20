<template>
  <div class="jd-tab-box">
    <div class="tab" :style="{'width': width}" :class="className">
      <el-tabs stretch v-model="active" @tab-click="handleClick">
        <el-tab-pane
          v-for="(tab, i) in tabs"
          :key="i"
          :label="tab.label"
          :name="tab.name"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
/**
 * @prop { Boolean } value 当前选中
 * @prop { String } width tab的宽度
 * @prop { Boolean } aibank 是否是aibank
 * @prop { Array } tabs 展示的tab @property { String } label 显示的文案 @property { String } name 对应显示的tab的name 赋给 value
 */
import elTabs from '../el-tabs'
import elTabPane from '../el-tab-pane'

export default {
  name: 'JdTab',
  components: {
    elTabs,
    elTabPane
  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    tabs: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String],
      default: '340px'
    },
    aibank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: this.value
    }
  },
  computed: {
    className() {
      const defaultClassName = []
      if (this.aibank) {
        defaultClassName.push('aibank')
      }
      return defaultClassName
    }
  },
  watch: {
    active(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$emit('handle-click', tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-tab-box {
  background-color: $white;
  border-bottom: 2px solid $gray-7;
  padding-top: 18px;
  .tab {
    /* width: 320px; */
    /deep/ .el-tabs__header {
      margin-bottom: 0;
    }
    /deep/ .el-tabs__nav-wrap::after {
      display: none;
    }
    // tab 字体
    /deep/ .el-tabs__item {
      padding: 0 34px;
      color: $gray;
      font-size: 18px;
      &.is-active {
        color: $blue;
      }
    }
    // tab下划线
    /deep/ .el-tabs__active-bar {
      background-color: $blue;
    }
  }
  .aibank {
    // tab 字体
    /deep/ .el-tabs__item {
      &.is-active {
        color: $aibank-blue;
      }
    }
    // tab下划线
    /deep/ .el-tabs__active-bar {
      background-color: $aibank-blue;
    }
  }
}
</style>
