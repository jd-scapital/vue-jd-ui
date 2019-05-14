<template>
  <div class="jd-tab-box">
    <div class="tab" :style="{'width': width}">
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
    }
  },
  data() {
    return {
      active: this.value
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
