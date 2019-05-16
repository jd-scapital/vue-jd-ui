# 弹框

## 作用
- 统一项目消息弹框, 成功/失败/消息弹框

## 依赖
- `jd-alter`

## 使用
```bash
# js
import { Message } from 'vue-jd-ui'
Vue.use(Message)
# html
<jd-message v-model="isShow"></jd-message>
```

## props
- `type`: 弹框类型
  - `MSG_TYPE_SUCCESS`: 成功弹框
  - `MSG_TYPE_FAIL`: 失败弹框
  - `MSG_TYPE_INFO`: 消息弹框

## emit
- `submit`: 确定按钮提交事件
