<template>
  <div class="jd-verify-code-small">
    <input type="text" placeholder="6位短信验证码"
      v-model="code">
    <div class="operate">
      <span class="spare-time" v-if="start">{{time}}S</span>
      <a href="javascript:;" @click="getCode" v-else>获取</a>
    </div>
  </div>
</template>
<script>
/**
 * @file components/common/VerifyCodeSmall.vue
 * @description 小的验证码组件
 * @createTime 2019年04月08日14:44:09
 */
import { INPUT_TYPE_VERIFY_CODE_SPARE_TIME } from 'vue-jd-ui/src/utils/constant'

export default {
  name: 'JdVerifyCodeSmall',
  data() {
    return {
      // 验证码
      code: '',
      // 倒计时时间
      time: INPUT_TYPE_VERIFY_CODE_SPARE_TIME,
      // 倒计时timer
      timeTimer: null,
      // 是否开始倒计时
      start: false
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      if (this.timeTimer) {
        return
      }
      this.start = true
      this.timeTimer = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          this.reset()
        }
      }, 1e3)
    },
    reset() {
      clearInterval(this.timeTimer)
      this.timeTimer = null
      this.time = INPUT_TYPE_VERIFY_CODE_SPARE_TIME
      this.start = false
    }
  },
  destroyed() {
    this.reset()
  }
}
</script>
<style lang="scss" scoped>
.jd-verify-code-small {
  width: 197px;
  height: 28px;
  border: 1px solid $gray-c9;
  position: relative;
  display: inline-block;
  input {
    outline: none;
    height: 20px;
    position: absolute;
    top: 3px;
    left: 13px;
    margin: 0;
    padding: 0;
    border-width: 0;
  }
  .operate {
    position: absolute;
    right: 0;
    top: 4px;
    height: 18px;
    width: 56px;
    border-left: 1px solid $gray-c9;
    text-align: center;
    a {
      height: 18px;
      line-height: 18px;
      color: $blue;
      font-size: 14px;
      text-decoration: none;
      display: block;
    }
    .spare-time {
      display: block;
      height: 18px;
      line-height: 18px;
    }
  }
}
</style>
