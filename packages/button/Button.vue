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
    // 外部传入class
    classNames: {
      type: String,
      default: ''
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
      if (this.classNames) {
        this.classNames.split(' ').forEach(claz => {
          className.push(claz)
        })
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
