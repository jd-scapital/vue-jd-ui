<template>
  <div class="jd-verify-code">
    <div class="input-box clearfix">
      <div class="input">
        <input type="text"
          :value="value"
          @input="changeHandle"
          @change="changeHandle">
        <span v-show="showPlaceholder" class="placeholder">{{placeholder}}</span>
      </div>
      <div
        class="send"
        :class="{forbidden: lock}"
        @click="sendHandle">{{sendText}}</div>
    </div>
    <div v-show="warning" class="warn">
      <div ref="slot">
        <slot name="warn">
          <p>短信验证码将发送至{{ phone | mask-phone }}的手机上，如长时间未收到验证码，请
            <span class="voice" @click="voiceHandle">尝试语音验证</span>
          </p>
        </slot>
      </div>

    </div>
  </div>
</template>
<script>
/**
 * @prop { Number / String: required } value code码
 * @prop { String: required } phone 手机号
 * @prop { Boolean } isCs 当前是否是发送长行验证码
 * @prop { String } type 当前短信验证码的模板类型, 当 isCs: false 时为必填
 * @prop { String } placeholder placeholder
 * @prop { Number } time 倒计时时间，单位：秒
 * @prop { Function } codePromise 发送验证码的请求
 * @event send-handle 点击发送按钮时触发
 * @event get-certificate 发送获取验证码的请求成功后用来校验的凭证
 * @template slot:warn 自定义提示
 * @function reset 重置（外部ref引用）
 */
import { PUSH_TXT, PUSH_VOICE } from 'vue-jd-ui/src/utils/constant'
import ElMessage from 'vue-jd-ui/packages/el-message'
const mask = (content = '', fromStart, tillEnd) => {
  content = String(content).trim()
  const total = content.length
  let maskLength = total - fromStart - tillEnd
  if (maskLength <= 0) {
    return content
  }
  if (maskLength > 8) {
    maskLength = 8
  }
  return content.substr(0, fromStart) + '*'.repeat(maskLength) + content.substr(-tillEnd)
}
export default {
  name: 'JdVerifyCode',
  filters: {
    maskPhone(phone = '') {
      return mask(phone, 3, 4)
    }
  },
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入验证码'
    },
    time: {
      type: Number,
      default: 30
    },
    codePromise: {
      type: Function,
      default: (params) => {
        return new Promise((resolve, reject) => {
          reject(new Error('请传入一个函数并返回一个Promise'))
        })
      },
      required: true
    },
    phone: {
      type: String,
      default: '******',
      required: true
    },
    isCs: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      $message: ElMessage,
      // 按钮文字
      sendText: '获取',
      // 短信提交锁定
      lock: false,
      // 语音提交锁定
      voiceLock: false,
      // 计时器
      timer: null,
      // 当前倒计时剩余时间
      currentTime: this.time,
      // 是否显示warn
      warning: false
      // codePromise: this.$api.smsPush
      // csCodePromise: new Promise()
    }
  },
  computed: {
    showPlaceholder() {
      if (!String(this.value)) {
        return true
      }
      else {
        return false
      }
    }
    // codePromise() {
    //   if (this.isCs) {
    //     return new Promise((resolve, reject) => {
    //       resolve()
    //     })
    //   }
    //   else {
    //     return this.$api.smsPush
    //   }
    // }
  },
  destroyed() {
    this.clearCountDown()
  },
  methods: {
    // 输入框数据绑定
    changeHandle(e) {
      let value = e.target.value
      value = String(value).trim()
      this.$emit('input', value)
    },
    // 同步短信发送凭证
    syncCertificate(traceId) {
      this.$emit('get-certificate', traceId)
    },
    // 短信验证
    sendHandle() {
      if (this.lock || this.timer) {
        return false
      }
      this.lock = true
      this.$emit('send-handle')
      if (this.isCs) {
        // this.csCodePromise()
      }
      else {
        this.codePromise({
          pushType: PUSH_TXT,
          phoneNo: this.phone,
          action: this.type
        }).then(({ data }) => {
          const { traceId, message } = data
          this.warning = true
          this.$message.success(message)
          this.syncCertificate(traceId)
          // 倒计时
          this.countDown()
        }, reject => {
          console.error(reject)
          // 清空计时器
          this.clearCountDown()
        })
      }
    },
    // 语音验证
    voiceHandle() {
      if (this.voiceLock) {
        return false
      }
      this.voiceLock = true
      if (this.isCs) {
        // this.csCodePromise()
      }
      else {
        this.codePromise({
          pushType: PUSH_VOICE,
          phoneNo: this.phone,
          action: this.type
        }).then(({ data }) => {
          console.log('send voice')
          const { traceId, message } = data
          this.$message.success(message)
          this.voiceLock = false
          this.syncCertificate(traceId)
        }, reject => {
          console.error(reject)
          this.voiceLock = false
        })
      }
    },
    // 倒计时
    countDown() {
      this.sendText = this.time + 's'
      this.timer = setInterval(() => {
        // 倒计时时间
        this.currentTime = this.currentTime - 1
        // 显示的时间
        this.sendText = this.currentTime + 's'
        if (this.currentTime === 0) {
          // 清空计时器
          this.clearCountDown()
        }
      }, 1000)
    },
    // 清空倒计时
    clearCountDown() {
      clearInterval(this.timer)
      this.timer = null
      this.sendText = '获取'
      // 重置lock
      this.lock = false
      // 重置倒计时
      this.currentTime = this.time
    },
    // reset
    reset() {
      this.warning = false
      this.$emit('input', '')
      this.$emit('get-certificate', '')
      this.clearCountDown()
    }
  }
}
</script>
<style lang="scss" scoped>
.jd-verify-code {
  display: inline-block;
  vertical-align: top;
  .input {
    float: left;
    position: relative;
    width: 225px;
    height: 48px;
    background-color: $white;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid $gray;
      border-right: none;
      outline: none;
      padding: 20px;
      box-sizing: border-box;
      color: $black-deep;
      z-index: 2;
      background-color: transparent;
    }
    .placeholder {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      font-size: 18px;
      color: $gray;
      z-index: 1;
    }
  }
  .send {
    float: left;
    position: relative;
    background-color: $white;
    width: 116px;
    height: 48px;
    box-sizing: border-box;
    border: 1px solid $gray;
    border-left: none;
    text-align: center;
    line-height: 46px;
    color: $blue-2;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 1px;
      height: 17px;
      background-color: $gray;
    }
    &.forbidden {
      color: $gray;
      font-size: 18px;
      font-weight: 500;
      cursor: not-allowed;
    }
  }
  .warn {
    color: $gray-8;
    font-size: 14px;
    padding-top: 12px;
    padding-left: 4px;
    .voice {
      color: $blue-3;
      cursor: pointer;
    }
  }
}
</style>
