<template>
  <div class="code">
    <div id="render"></div>
    <div class="title">{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
/**
 * @file components/code.vue
 * @description 代码块
 * @createTime 2019年06月04日10:08:29
 */
import Vue from 'vue'
import { transform } from '@babel/core'

export default {
  name: 'MdCode',
  props: {
    // 代码块标题
    title: {
      type: String,
      default: ''
    },
    // 代码文本
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      renderHtml: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const code = this.code
      if (!code) {
        return
      }
      const templateStart = '<template>'
      const templateEnd = '\<\/template>'
      const scriptStart = '<script>'
      const scriptEnd = '\<\/script>'
      const template = code.substring(code.indexOf(templateStart) + templateStart.length, code.indexOf(templateEnd))
      let script = code.substring(code.indexOf(scriptStart) + scriptStart.length, code.indexOf(scriptEnd))
      script = script.replace('export default ', '() => { return ')
      script = `${script} }`
      script = transform(script).code
      // eslint-disable-next-line
      script = window.eval(script)
      script = script()
      let option = {
        template: `<div class="code-render">${template}</div>`
      }
      option = Object.assign({}, option, script)
      const Component = Vue.extend(option)
      new Component({ el: '#render' }).$mount()
    }
  }
}
</script>
<style lang="scss" scoped>
.code {
  background-color: $white;
  border: 1px solid $border;
  /deep/ .code-render {
    margin-top: 10px;
    padding: 10px;
    border-bottom: 1px solid $border;
  }
  .title {
    margin: 10px;
    padding: 15px 20px;
    border: 1px solid $border;
  }
}
</style>
