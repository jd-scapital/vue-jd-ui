<template>
  <div class="input-select">
    <i class="el-icon-arrow-down"></i>
    <ul class="options"
      :class="{'options-hide': !show}"
      :style="`height: ${options.length * 30}px;`">
      <li v-for="(option, key) in options"
        :key="key"
        :class="{'active': option.active}"
        @click="optionSelect(option)">
        {{option.name}}
      </li>
    </ul>
  </div>
</template>
<script>
/**
 * @file components/common/normal-input/select.vue
 * @description 下拉框
 * @createTime 2019年03月27日11:23:44
 */
export default {
  name: 'NormalInputSelect',
  props: {
    // 下拉选项框是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 下拉选项列表
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 选项选择
    optionSelect(option = {}) {
      const selectValue = option.value
      this.options.forEach(o => {
        o.active = o.value === selectValue
      })
      this.$emit('select', selectValue)
      this.hideOptions()
    },
    // 隐藏选项
    hideOptions() {
      this.$emit('update:show', false)
    }
  }
}
</script>
