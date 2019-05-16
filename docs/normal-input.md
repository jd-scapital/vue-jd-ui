# 输入框

## 作用
- 自定义设计输入框

## 依赖
- `normal-input-select`
- `el-message`

## 使用
```bash
# js
import { NormalInput } from 'vue-jd-ui'
Vue.use(NormalInput)
# html
<jd-normal-input
  :type="'text'"
  :placeholder="'请输入文本'"
  :options="[{name: '北京市', value: '北京市'}]"
  :validator="name"
  :rule="{ name: '姓名', required: true, checked: false, ok: false, trigger: 'blur' }"
  v-model="value"
  @verifyInfo="verifyInfo">
</jd-normal-input>
```

## props
- `placeholder`: 输入框没值时默认提示语
- `type`: 输入框类型
- `value`: 输入框值
- `childValue`: type为select时, 下拉框子级下拉框值
- `options`: 下拉选项
  - `[{ name: '北京市', value='北京市' }]`
- `validator`: 校验器
  ```bash
  name(rule, value, func) {
    if (!value) {
      func && func('姓名不能为空')
    }
    else {
      func()
    }
  }
  ```
- `rule`: 规则
  - `{ name: '姓名', required: true, checked: false, ok: false, trigger: 'blur' }`
    - `name`: 错误提示输入框名称
    - `required`: 是否要求必填
    - `checked`: 检测已检验
    - `ok`: 是否检验okay
    - `trigger`: 自动检测方式
      - `blur`: 失去焦点后检测
      - `change`: 输入框值发生变化检测
- `smsPush`: 短信发送函数(函数返回一个Promise)
  - `() => { return this.$api.smsPush() }`

## emit
- `verifyInfo`: 验证码验证的结果
