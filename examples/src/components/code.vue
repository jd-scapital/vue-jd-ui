<template>
  <div class="code" ref="code">
    <div class="render"></div>
    <!-- <div ref="render"></div> -->
    <collapse-transition>
      <div class="base-code" v-show="isShowBaseCode">
        <div class="title">{{title}}</div>
        <slot></slot>
      </div>
    </collapse-transition>
    <div class="button" @click="toggleBaseCode"
      :class="{ 'is-show': isShowBaseCode ? 1 : 0 }">
      <i class="button-icon el-icon-caret-bottom"></i>
      <span class="text">{{ isShowBaseCode ? '隐藏代码' : '显示代码'}}</span>
    </div>
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
      // 是否展示源码
      isShowBaseCode: false,
      renderWrap: ''
    }
  },
  watch: {
    code(val) {
      if (val) {
        this.init()
      }
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
      const templateClass = 'code-render'
      const codeDom = this.$refs.code
      // const render = this.$refs.render
      // 旧的dom移除
      const afterRenderDom = codeDom.querySelector(`.${templateClass}`)
      if (afterRenderDom) {
        afterRenderDom.remove()
      }
      // 添加新的渲染容器
      const dom = document.createElement('div')
      dom.setAttribute('class', 'render')
      const codeChildFirst = codeDom.childNodes[0]
      if (!codeChildFirst) {
        return console.warn('code child first was empty')
      }
      codeChildFirst.before(dom)
      const render = dom

      // 解析code字符串
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
        template: `<div class="${templateClass}">${template}</div>`
      }
      option = Object.assign({}, option, script)
      option.el = render
      new Vue(option).$mount()
      // const Component = Vue.extend(option)
      // new Component({ el: render }).$mount()
    },
    // 展示或隐藏
    toggleBaseCode() {
      this.isShowBaseCode = !this.isShowBaseCode
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
  .button {
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: $sliver;
    background-color: $white;
    cursor: pointer;
    .text {
      opacity: 0;
      transition: opacity .6s ease;
    }
    .button-icon {
      position: relative;
      left: 48px;
      transition: left .3s ease;
    }
    &.is-show {
      .el-icon-caret-bottom {
        display: inline-block;
        transform: rotate(180deg);
      }
    }
    &:hover {
      color: $blue;
      background-color: $bgColor;
      .button-icon {
        left: 0;
      }
      .text {
        margin-left: 5px;
        opacity: 1;
        display: inline-block;
      }
    }
  }
}
</style>
