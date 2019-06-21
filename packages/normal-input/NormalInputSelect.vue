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
<style lang="scss" scoped>
.input-select {
  background-color: $white;
  .el-icon-arrow-down {
    padding: 6.5px 6.5px 5.5px 6.5px;
  }
  .options {
    position: absolute;
    top: 32px;
    right: 0;
    z-index: 6;
    overflow: scroll;
    transition: all .3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
    will-change: transform;
    max-height: 258px;
    box-shadow: 0px 2px 7px 3px rgba(35,19,74,0.12);
    transform-origin: center top;
    transform: scaleY(1);
    opacity: 1;
    &.options-hide {
      box-shadow: none;
      transform: scaleY(0);
      opacity: 0;
    }
    li {
      background-color: $white;
      // height: 30px;
      line-height: 24px;
      min-width: 146px;
      padding-left: 10px;
      padding-top: 3px;
      padding-bottom: 3px;
      box-sizing: border-box;
      font-size: 14px;
      color: $black-solid;
      cursor: pointer;
      &:hover {
        background-color: $gray-bg-select;
      }
      &.active {
        background-color: $gray-bg-select;
      }
    }
  }
  // .wrap {
  //   position: relative;
  // }
}
</style>
