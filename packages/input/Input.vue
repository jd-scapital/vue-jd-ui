<template>
  <div class="jd-input-box" :class="{ 'aibank': aibank, 'disabled': disabled }">
    <div v-if="isSubmit" class="input-submit">
      <div class="input">
        <input
          type="text"
          :value="value"
          :disabled="disabled"
          @change="changeHandle"
          @input="changeHandle"
          @dblclick="dblclickHandle">
        <span v-show="showPlaceholder" class="placeholder">{{placeholder}}</span>
        <button class="all-in" v-if="!disabled" @click="allInHandle">{{allInText}}</button>
      </div>
      <button class="confirm" @click="confirmHandle">{{confirmText}}</button>
      <p class="format">{{transformText}}： {{toChinese}}</p>
      <p class="warning" v-show="warning.show">{{warning.text}}</p>
    </div>
    <div v-else class="input-input" :class="{ 'focus': focus }">
      <div class="input">
        <input
          type="text"
          :value="value"
          :disabled="disabled"
          @change="changeHandle"
          @input="changeHandle"
          @focus="focusHandle"
          @blur="blurHandle"
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
 * @prop { Boolean } aibank 是否是aibank
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
    aibank: {
      type: Boolean,
      default: false
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
      showPlaceholder: true,
      focus: false
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
    focusHandle() {
      if (this.disabled) {
        return false
      }
      this.focus = true
    },
    blurHandle(e) {
      if (this.disabled) {
        return false
      }
      const value = e.target.value
      if (!String(value)) {
        this.focus = false
      }
      else {
        this.focus = true
      }
    },
    changeHandle(e) {
      if (this.disabled) {
        return false
      }
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
      if (this.disabled) {
        return false
      }
      this.$emit('all-in-handle')
    },
    confirmHandle() {
      if (this.disabled) {
        return false
      }
      this.$emit('confirm-handle')
    },
    dblclickHandle() {
      if (this.disabled) {
        return false
      }
      this.$emit('double-handle')
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-input-box {
  display: inline-block;
  height: 50px;
  vertical-align: top;
  margin-bottom: 40px;
  > div {
    height: 100%;
    width: 100%;
  }
  .input-input {
    &.focus {
      .input {
        input {
          border: 1px solid $button-fill;
        }
      }
    }
    .input {
      input {
        border: 1px solid $gray-11;
      }
    }
  }
  .input {
    display: inline-block;
    position: relative;
    width: 260px;
    height: 100%;
    vertical-align: top;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 14px;
      padding: 0 0 0 10px;
      box-sizing: border-box;
      outline: none;
      border-color: $button-fill;
      border-width: 1px;
      background-color: transparent;
      z-index: 2;
    }
    .placeholder {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      font-size: 14px;
      font-weight: 400;
      color: $gray;
      user-select: none;
      z-index: 1;
    }
  }
  button {
    padding: 0;
    font-weight: 400;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    vertical-align: top;
  }
  .all-in {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 12px;
    color: $a;
    z-index: 3;
    user-select: none!important;
  }
  .confirm {
    float: right;
    width: 142px;
    height: 50px;
    line-height: 50px;
    color: $white;
    background-color: $button-fill;
    font-size: 14px;
  }
  .format {
    font-size: 12px;
    font-weight: 400;
    color: $black;
    padding-top: 4px;
    padding-left: 7px;
    width: 260px;
  }
  .warning {
    font-size: 12px;
    font-weight: 400;
    color: $red-2;
    padding-left: 7px;
  }
}
.jd-input-box.disabled {
  .input {
    input {
      cursor: not-allowed;
      background-color: rgba(128, 128, 128, 0.15);
      border: none;
      border: 1px solid #ddd;
    }
  }
  .all-in {
    cursor: not-allowed;
  }
  .input-submit {
    .confirm {
      background-color: gray;
      cursor: not-allowed;
    }
  }
}
.jd-input-box.aibank {
  .input-input {
    &.focus {
      .input {
        input {
          border-color: $aibank-blue;
        }
      }
    }
  }
  .confirm {
    background-color: $aibank-blue;
  }
}
</style>
