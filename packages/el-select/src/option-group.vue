<template>
  <ul class="el-select-group__wrap" v-show="visible">
    <li class="el-select-group__title">{{ label }}</li>
    <li>
      <ul class="el-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
import Emitter from 'vue-jd-ui/src/mixins/emitter'

export default {
  mixins: [Emitter],

  name: 'ElOptionGroup',

  componentName: 'ElOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: true
    }
  },

  watch: {
    disabled(val) {
      this.broadcast('ElOption', 'handleGroupDisabled', val)
    }
  },

  methods: {
    queryChange() {
      this.visible = this.$children
        && Array.isArray(this.$children)
        && this.$children.some(option => option.visible === true)
    }
  },

  created() {
    this.$on('queryChange', this.queryChange)
  },

  mounted() {
    if (this.disabled) {
      this.broadcast('ElOption', 'handleGroupDisabled', this.disabled)
    }
  }
}
</script>
<style lang="scss">
.el-select-group {
  margin: 0;
  padding: 0;
}
.el-select-group__wrap {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.el-select-group__wrap:not(:last-of-type) {
  padding-bottom: 24px;
}
.el-select-group__wrap:not(:last-of-type)::after {
  content: '';
  position: absolute;
  display: block;
  left: 20px;
  right: 20px;
  bottom: 12px;
  height: 1px;
  background: #e4e7ed;
}
.el-select-group__title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
.el-select-group .el-select-dropdown__item {
  padding-left: 20px;
}
</style>
