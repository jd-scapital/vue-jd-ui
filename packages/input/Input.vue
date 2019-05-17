<template>
  <div class="jd-input-box">
    <div v-if="isSubmit" class="input-submit">
      <div class="input">
        <input
          type="text"
          :value="value"
          @change="changeHandle"
          @input="changeHandle">
        <span v-show="showPlaceholder" class="placeholder">{{placeholder}}</span>
        <button class="all-in" @click="allInHandle">{{allInText}}</button>
      </div>
      <button class="confirm" @click="confirmHandle">{{confirmText}}</button>
      <p class="format">可购金额大写： {{toChinese}}</p>
      <p class="warning" v-show="warning.show">{{warning.text}}</p>
    </div>
    <div v-else class="input-input">
      <div class="input">
        <input
          type="text"
          :value="value"
          @change="changeHandle"
          @input="changeHandle"
          @dblclick="dblclickHandle">
        <span v-show="showPlaceholder" class="placeholder">{{placeholder}}</span>
      </div>
      <p class="format" v-show="value">{{toChinese}}</p>
      <p class="format" v-show="!value">{{transformText}}</p>
      <p class="warning" v-show="warning.show">{{warning.text}}</p>
    </div>
  </div>
</template>
<script>
/**
 * @prop { String / Number: required } value 输入框的值
 * @prop { String } type 按钮类型
 * @prop { String } placeholder
 * @prop { String } allInText 全部金额选择显示的文案 （type为submit）
 * @prop { String } confirmText 确认按钮的文案 （type为submit）
 * @prop { String } transformText 转换金额的文案
 * @prop { Object } warning 错误提示 @property { Boolean } show 是否显示 @property { String } text 显示的文字
 * @event all-in-handle 点击全部金额 触发 （type为submit）
 * @event confirm-handle 点击确认 触发 （type为submit）
 * @event double-handle 双击 触发 （type为input）
 * @event change-handle input值改变时触发
 */
import { numberToChinese } from 'vue-jd-ui/src/utils/tools'
import { BUTTON_SUBMIT } from 'vue-jd-ui/src/utils/constant'
export default {
  name: 'JdInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: BUTTON_SUBMIT // 默认是带提交按钮的，对应的type在constant.js
    },
    placeholder: {
      type: String,
      default: ''
    },
    // 全部金额选择文案
    allInText: {
      type: String,
      default: ''
    },
    // 确认文案
    confirmText: {
      type: String,
      default: ''
    },
    transformText: {
      type: String,
      default: '汇款金额大写'
    },
    // 错误提示
    warning: {
      type: Object,
      default: () => ({
        show: false,
        text: ''
      })
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPlaceholder: true
    }
  },
  watch: {
    value(val) {
      if (!String(val)) {
        this.showPlaceholder = true
      }
      else {
        this.showPlaceholder = false
      }
    }
  },
  computed: {
    toChinese() {
      if (!isNaN(this.value)) {
        return numberToChinese(this.value)
      }
      return '无效数字'
    },
    isSubmit() {
      return this.type === BUTTON_SUBMIT
    }
  },
  mounted() {
    if (!String(this.value)) {
      this.showPlaceholder = true
    }
    else {
      this.showPlaceholder = false
    }
  },
  methods: {
    changeHandle(e) {
      const value = e.target.value
      if (!String(value)) {
        this.showPlaceholder = true
      }
      else {
        this.showPlaceholder = false
      }
      const noSpaceValue = String(value).trim()
      this.$emit('input', noSpaceValue)
      this.$emit('change-handle', noSpaceValue)
    },
    allInHandle() {
      this.$emit('all-in-handle')
    },
    confirmHandle() {
      this.$emit('confirm-handle')
    },
    dblclickHandle() {
      this.$emit('double-handle')
    }
  }
}
</script>
