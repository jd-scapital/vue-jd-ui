<template>
  <a href="javascript:void(0);" class="jd-button" :class="className"
    @click.stop="click">
    <slot></slot>
  </a>
</template>
<script>
/**
 * @prop { String } type 按钮类型 @type fill 有填充色 @type none 无填充色
 * @prop { String / Object } to 路由跳转
 * @prop { Boolean } disabled 禁用状态
 * @prop { Boolean } aibank 是否是aibank
 * @event click 点击触发
 * @template slot 按钮内容
 */
export default {
  name: 'JdButton',
  props: {
    /**
     * @type fill 有填充色
     * @type none 无填充色
     */
    type: {
      type: String,
      default: 'none'
    },
    // 跳转地址
    to: {
      type: [String, Object],
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否是aibank
    aibank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      const className = []
      switch (this.type) {
        case 'fill':
          className.push('fill')
          break
        case 'text':
          className.push('text')
          break
        default:
          className.push('blank')
      }
      if (this.disabled) {
        className.push('disabled')
      }
      if (this.aibank) {
        className.push('aibank')
      }
      return className
    }
  },
  methods: {
    click(...params) {
      if (this.disabled) {
        return false
      }
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('click', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-button {
  display: inline-block;
  font-size: 14px;
  line-height: 30px;
  text-decoration: none!important;
  border-radius: 50px;
  border: 1px solid $button-fill;
  text-align: center;
  &.fill {
    background-color: $button-fill;
    color: $white;
  }
  &.text {
    color: $button-fill;
    border-width: 0;
    &:hover {
      background-color: initial;
      border-width: 0;
      color: $button-fill;
    }
  }
  &.blank {
    color: $button-fill;
  }
  &:hover {
    background-color: $button-hover;
    border-color: $button-hover;
    color: $white;
  }
  &.disabled {
    background-color: $gray-12;
    border-color: $gray-12;
    color: $white;
    cursor: not-allowed;
  }
  &.aibank {
    border: 1px solid $aibank-blue;
    &.fill {
      background-color: $aibank-blue;
      color: $aibank-blue-text;
    }
    &.text {
      border-width: 0;
      color: $aibank-blue;
      &:hover {
        background-color: transparent;
        color: $aibank-blue;
      }
    }
    &.blank {
      color: $aibank-blue;
    }
    &:hover {
      background-color: $aibank-blue-hover;
      border-color: $aibank-blue-hover;
      color: $aibank-blue-text;
    }
    &.disabled {
      background-color: $aibank-blue-disabled;
      border-color: $aibank-blue-disabled;
      color: $aibank-blue-text;
      cursor: not-allowed;
    }
  }
}
</style>
