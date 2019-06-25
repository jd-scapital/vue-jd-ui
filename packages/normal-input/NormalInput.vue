<template>
  <div class="normal-input"
    :class="{
      'hover': isHover || hasVal,
      [type]: 1,
      'error-wrap': errorMessage
    }"
    v-click-outside="inputBlur">
    <!-- 文本框 -->
    <div class="input-wrap" v-if="isText">
      <input type="text" ref="normalInput"
        @click="inputClick"
        @focus="inputClick"
        @blur="inputBlur"
        v-model="inputVal">
      <div class="placeholder"
        @click="inputClick">{{placeholder}}</div>
    </div>
    <!-- 密码输入框 -->
    <div class="input-wrap input-password" v-else-if="isPassword">
      <input :type="inputType" ref="normalInput"
        @click="inputClick"
        @focus="inputClick"
        @blur="inputBlur"
        v-model="inputVal">
      <div class="placeholder"
        @click="inputClick">{{placeholder}}</div>
      <div class="eye-btn" v-if="hasVal"
        @click="seePassword">
        <!-- 默认保密 -->
        <i class="iconfont iconeye-clouse" v-if="isPasswordHide"></i>
        <!-- 密码展示 -->
        <i class="iconfont iconeye_show" v-else></i>
      </div>
    </div>
    <!-- 验证码输入框 -->
    <div class="input-wrap input-verify-code" v-else-if="isVerifyCode">
      <input type="text" ref="normalInput"
        @click="inputClick"
        @focus="inputClick"
        @blur="inputBlur"
        v-model="inputVal">
      <div class="placeholder"
        @click="inputClick">{{placeholder}}</div>
      <div class="send-btn">
        <span class="spare-time" v-if="isShowSpareTime">{{spareTime}}S&nbsp;&nbsp;</span>
        <a class="send" href="javascript:;" v-else
          @click="sendVerifyCode">{{verifyCodeText}}</a>
      </div>
    </div>
    <!-- 下拉框框 -->
    <div class="input-wrap-select" ref="inputSelect" v-else-if="isSelect"
      v-click-outside="selectClickOutSide"
      @click="inputClick">
      <div class="placeholder" ref="placeholder" @click.prevent="selectShow = !selectShow">
        {{placeholder}}
      </div>
      <input type="text" ref="normalInput" v-model="inputVal"
        @click="selectShow = !selectShow">
      <input-select class="select-wrap"
        :show.sync="selectShow"
        :options="options"
        @select="val => inputVal = val">
      </input-select>
    </div>
    <!-- 多选下拉框框 -->
    <div class="input-wrap-multi-select" v-else-if="isMultiSelect"
      @click="inputClick">
      <div class="placeholder" ref="placeholder" @click="selectShow = !selectShow">{{placeholder}}</div>
      <!-- parent select -->
      <div class="multi-select multi-select-parent" ref="inputSelect"
        v-click-outside="selectClickOutSide">
        <input type="text" readonly="readonly" ref="normalInput"
          v-model="inputVal"
          @click="selectShow = !selectShow">
        <input-select class="select-wrap"
          :show.sync="selectShow"
          :options="options"
          @select="val => inputVal = val"></input-select>
      </div>
      <!-- child select -->
      <div class="multi-select multi-select-child" ref="inputMultiSelect"
        v-click-outside="multiSelectClickOutSide">
        <input type="text" readonly="readonly" ref="normalInput"
          v-model="inputChildVal"
          @click="selectChildShow = !selectChildShow">
        <input-select class="select-wrap"
          :show.sync="selectChildShow"
          :options="childOptions"
          @select="val => inputChildVal = val"></input-select>
      </div>
    </div>
    <div class="line"></div>
    <div class="line-hover"></div>
    <div class="error-msg" v-show="errorMessage">
      {{errorMessage}}
    </div>
  </div>
</template>
<script>
/**
 * @file components/common/NormalInput.vue
 * @param type 输入框类型
 *  text 普通输入框
 *  select 普通选择框 TODO
 *  multi-select 普通多选框 TODO
 *  password 密码选择框
 *  verify-code 短信验证码
 * @param value 输入框值
 * @param childValue 子级输入框值
 * @param options 输入框选项(type为select/multi-select有效)
 *  [{
 *    name: 'optionName',
 *    value: 'optionValue',
 *    childs: [{
 *      name: 'optionName',
 *      value: 'optionValue'
 *    }]
 *  }]
 * @emit value 输入框/单选框/级联多选框的值
 * @emit childValue 子级输入框的值
 * @emit verifyInfo 验证码发送成功后回传的信息: { traceId: '', success: true/false, message: '' }
 * @description 普通输入框/单选框/级联段选框
 * @createTime 2019年03月26日09:57:17
 */
import VClickOutside from 'v-click-outside'
import ElMessage from 'vue-jd-ui/packages/el-message'
import InputSelect from 'vue-jd-ui/packages/normal-input-select'

import { isChildOf } from 'vue-jd-ui/src/utils/dom'
import {
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_SELECT,
  INPUT_TYPE_MULTI_SELECT,
  INPUT_TYPE_VERIFY_CODE,
  INPUT_TYPE_VERIFY_CODE_SPARE_TIME
} from 'vue-jd-ui/src/utils/constant.js'

export default {
  name: 'JdNormalInput',
  directives: {
    clickOutside: VClickOutside.directive
  },
  props: {
    // placeholder
    placeholder: {
      type: String,
      default: ''
    },
    // 默认类型
    type: {
      type: String,
      default: 'text'
    },
    // 输入框的值
    value: {
      type: [ String, Number ],
      default: ''
    },
    // 级联输入框的值
    childValue: {
      type: [ String, Number ],
      default: ''
    },
    // 下拉框选项
    options: {
      type: Array,
      default() {
        return []
      }
    },
    // 校验器
    validator: {
      type: Function,
      default: null
    },
    // 校验规则, TODO: 完善组件校验功能
    rule: {
      type: Object,
      default() {
        return {
          // 输入框的值
          name: '',
          // 是否是必填
          required: false,
          // 是否要检查(主动检查/自定义检查)
          checked: false,
          // 检查方式(自动检测): blur/change
          trigger: 'blur',
          // 是否校验通过
          ok: false
        }
      }
    },
    // 短信发送
    smsPush: {
      type: Function,
      default() {
        return null
      }
    },
    // 倒计时
    spare: {
      type: Number,
      default: INPUT_TYPE_VERIFY_CODE_SPARE_TIME
    }
  },
  data() {
    return {
      $message: ElMessage,
      // 短信验证码
      INPUT_TYPE_VERIFY_CODE,
      // 密码输入框
      INPUT_TYPE_PASSWORD,
      // 普通输入框
      INPUT_TYPE_TEXT,
      // 单选
      INPUT_TYPE_SELECT,
      // 级联多选
      INPUT_TYPE_MULTI_SELECT,
      // 密码是否是默认隐藏的
      isPasswordHide: true,
      // 密码输入框类型
      inputType: 'password',
      // 是否聚焦
      isHover: false,
      // 输入框的值
      inputVal: '',
      // 单选框
      selectShow: false,
      // 级联输入框的值
      inputChildVal: null,
      // 子级单选框
      selectChildShow: false,
      // 倒计时时间
      spareTime: this.spare,
      // 是否展示剩余时间
      isShowSpareTime: false,
      // 剩余时间定时器
      spareTimeTimer: null,
      // 是否已经发送过验证码
      isSendVerifyCode: false,
      // 错误信息
      errorMessage: ''
    }
  },
  computed: {
    // 输入框是否有值
    hasVal() {
      return this.inputVal
    },
    // 是否是验证码输入框
    isVerifyCode() {
      return this.type === this.INPUT_TYPE_VERIFY_CODE
    },
    // 是否是普通输入框
    isText() {
      return this.type === this.INPUT_TYPE_TEXT
    },
    // 是否是密码输入框
    isPassword() {
      return this.type === this.INPUT_TYPE_PASSWORD
    },
    // 是否是单选框
    isSelect() {
      return this.type === this.INPUT_TYPE_SELECT
    },
    // 是否是多选级联框
    isMultiSelect() {
      return this.type === this.INPUT_TYPE_MULTI_SELECT
    },
    // 子级选项列表
    childOptions() {
      const { inputVal, options } = this
      return inputVal
        ? options.find(o => o.value === inputVal).childs
        : []
    },
    verifyCodeText() {
      return this.isSendVerifyCode === false
        ? '获取短信验证码'
        : '重新获取'
    }
  },
  watch: {
    // 值同步
    value(val) {
      this.inputVal = val
    },
    // 子级值同步
    childValue(val) {
      this.inputChildVal = val
    },
    // 监听输入框值变化
    inputVal(val) {
      this.inputChildVal = ''
      this.$emit('input', val)
      if (val) {
        this.errorMessage = ''
      }
    },
    // 监听级联子级输入框值变化
    inputChildVal(val) {
      this.$emit('update:childValue', val)
    },
    // 是否要检查
    'rule.checked': async function(val) {
      if (val) {
        console.log('rule checked')
        // 值检测
        const checkResult = await this.valueCheck()
        console.log('rule.checked checkResult: ', checkResult)
        this.rule.ok = checkResult
        this.updateRule(this.rule)
      }
    },
    // 错误信息
    errorMessage(val) {
      if (!val) {
        this.resetChecked()
      }
    }
  },
  components: {
    InputSelect
  },
  mounted() {
    if (this.isText) {
      document.addEventListener('visibilitychange', this.visibilitychange)
    }
  },
  methods: {
    // 错误信息清除后, 需要重置checked值, 以下次使用
    resetChecked() {
      this.rule.checked = false
      this.updateRule(this.rule)
    },
    // 更新检测结果
    updateRule(rule) {
      this.$emit('update:rule', rule)
    },
    // 输入框的值检测: 主动监测、自动检测
    valueCheck() {
      return new Promise(resolve => {
        const self = this
        const { rule, validator, inputVal } = this
        const { name, required } = rule
        let autoCheckResult = true
        let ownCheckResult = true
        // 系统检查
        if (required) {
          if (!this.inputVal) {
            // this.inputClick()
            this.errorMessage = `${name}不能为空`
            autoCheckResult = false
          }
        }
        // 自定义检查
        if (validator) {
          validator(rule, inputVal, function(message) {
            if (message) {
              self.errorMessage = message
              ownCheckResult = false
            }
            resolve(autoCheckResult && ownCheckResult)
          })
        }
        else {
          resolve(autoCheckResult)
        }
      })
    },
    // 发送验证码
    async sendVerifyCode() {
      // 发送验证码
      const smsPush = this.smsPush()
      if (!smsPush) {
        return console.error('smsPush has not defined')
      }
      const resp = await smsPush
      if (resp.success) {
        this.$emit('verifyInfo', resp.data)
        // 验证码发送成功后
        this.isSendVerifyCode = true
        this.isShowSpareTime = true
        this.spareTimeTimer = setInterval(() => {
          if (this.spareTime === 1) {
            clearInterval(this.spareTimeTimer)
            this.spareTimeTimer = null
            this.isShowSpareTime = false
            this.spareTime = INPUT_TYPE_VERIFY_CODE_SPARE_TIME
            return
          }
          this.spareTime--
        }, 1000)
      }
      else {
        this.$message.error('验证码获取失败')
      }
    },
    // 密码查看
    seePassword() {
      this.isPasswordHide = !this.isPasswordHide
      if (this.isPasswordHide) {
        this.inputType = 'password'
      }
      else {
        this.inputType = 'text'
      }
    },
    // 视图隐藏时做的优化
    visibilitychange() {
      const input = this.$refs.normalInput
      if (document.visibilityState === 'hidden') {
        this.isHover = false
        input && input.blur()
      }
    },
    // 输入框点击
    inputClick() {
      this.isHover = true
      // this.selectShow = true
      this.$refs.normalInput.focus()
    },
    // 文本输入框
    inputBlur() {
      this.isHover = false
      this.selectShow = false
      if (!this.inputVal) {
        this.resetChecked()
      }
    },
    // 单选选项点击之外
    selectClickOutSide(e) {
      const selectWrap = this.$refs.inputSelect
      const target = e.target
      // add exception dom
      if (target === this.$refs.placeholder) {
        return
      }
      if (this.selectShow
        // 点击不在容器内
        && !isChildOf(target, selectWrap)) {
        this.selectShow = false
      }
    },
    // 级联多炫框点击之外
    multiSelectClickOutSide(e) {
      const multiSelectWrap = this.$refs.inputMultiSelect
      const target = e.target
      // add exception dom
      if (target === this.$refs.placeholder) {
        return
      }
      if (this.selectChildShow
        // 点击不在容器内
        && !isChildOf(target, multiSelectWrap)) {
        this.selectChildShow = false
      }
    }
  },
  destroyed() {
    if (this.isText) {
      document.removeEventListener('visibilitychange', this.visibilitychange)
    }
  }
}
</script>
<style lang="scss" scoped>
// placeholder样式
@mixin selectPlaceholder() {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  font-weight: 400;
  color: $gray-c9;
}
.normal-input {
  margin-bottom: 39px;
  position: relative;
  &.hover {
    .placeholder {
      bottom: 27px;
      font-size: 12px;
    }
    .line {
      opacity: 0;
    }
    .line-hover {
      width: 100%;
      left: 0;
    }
  }
  // 单选下拉框
  &.select {
    input {
      cursor: pointer;
      &::placeholder {
        @include selectPlaceholder();
      }
    }
  }
  // 多选下拉框
  &.multi-select {
    input {
      cursor: pointer;
    }
  }
  &.error-wrap {
    &.hover {
      .placeholder {
        color: $red-2;
      }
    }
    .line-hover {
      background-color: $red-2;
    }
  }
  // 输入框
  input {
    font-size: 14px;
    height: 27px;
    line-height: 27px;
    font-weight: 400;
    color: $black-deep;
    left: 0;
    padding: 2px 7px;
    outline: none;
    border-width: 0;
    width: 100%;
    box-sizing: border-box;
  }
  // 输入框默认展示文字
  .placeholder {
    @include selectPlaceholder();
    position: absolute;
    left: 7px;
    bottom: 10px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    font-weight: 400;
    color: $gray-c9;
    z-index: 1;
    transition: bottom .3s ease;
    cursor: pointer;
  }
  // 下边框
  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $gray-c9;
    z-index: 4;
    transition: opacity .3s;
  }
  // 下边框hover
  .line-hover {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 1px;
    background-color: $black-border;
    z-index: 3;
    transition: all .3s;
  }
  .input-wrap {
    // 验证码输入框
    &.input-verify-code {
      .send-btn {
        display: inline-block;
        position: absolute;
        right: 0;
        // 发送按钮
        .send {
          color: $blue;
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        // 剩余时间
        .spare-time {
          color: $gray-2;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
    // 密码框
    &.input-password {
      position: relative;
      .eye-btn {
        position: absolute;
        right: 0;
        top: 2px;
        display: inline-block;
        cursor: pointer;
        .iconeye-clouse,
        .iconeye_show {
          color: $gray-eye;
          font-size: 8px;
        }
        .iconeye_show {
          color: $gray-eye;
          font-size: 14px;
        }
      }
    }
    // 单选
    &-select {
      position: relative;
      height: 27px;
      line-height: 27px;
      display: flex;
      input {
        flex: 1;
      }
      .select-wrap {
        width: 27px;
        position: relative;
        bottom: 1px;
        right: 1px;
      }
    }
    // 多选级联
    &-multi-select {
      height: 27px;
      line-height: 27px;
      display: flex;
      position: relative;
      .multi-select {
        position: relative;
        // 选择框容器
        .select-wrap {
          position: absolute;
          right: 0;
          bottom: 1px;
          z-index: 5;
        }
        // 父级选项
        &-parent {
          width: 117px;
        }
        // 子级选项
        &-child {
          flex: 1;
          input {
            text-indent: 53px;
          }
        }
      }
    }
  }
  .error-msg {
    position: absolute;
    left: 8px;
    bottom: -20px;
    color: $red-2;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    font-weight: 400;
  }
}
</style>
