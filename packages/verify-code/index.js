import VerifyCode from './VerifyCode'

/* istanbul ignore next */
VerifyCode.install = function(Vue) {
  Vue.component(VerifyCode.name, VerifyCode)
}

export default VerifyCode
