# 消息弹框

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
## 例子

- 成功消息弹框
::: 成功消息弹框的示例用法, 不重写content
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="showModal">
      展示消息弹框
    </jd-button>
    <jd-message v-model="isShow"
      type="MSG_TYPE_SUCCESS"
      :title="'成功了'"
      :sub-title="'成功的原因'"
      @submit="submit">
    </jd-message>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showModal() {
      this.isShow = true
    },
    submit() {
      console.log('submit')
    }
  }
}
</script>
```

- 失败消息弹框
::: 失败消息弹框的示例用法, 不重写content
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="showModal">
      展示消息弹框
    </jd-button>
    <jd-message v-model="isShow"
      type="MSG_TYPE_FAIL"
      :title="'失败了'"
      :sub-title="'失败的原因'"
      @submit="submit">
    </jd-message>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showModal() {
      this.isShow = true
    },
    submit() {
      console.log('submit')
    }
  }
}
</script>
```

- 普通消息弹框
::: 普通消息弹框的示例用法, 不重写content
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="showModal">
      展示消息弹框
    </jd-button>
    <jd-message v-model="isShow"
      type="MSG_TYPE_INFO"
      :title="'普通消息'"
      :sub-title="'这就是一个普通消息的弹框提示'"
      @submit="submit">
    </jd-message>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showModal() {
      this.isShow = true
    },
    submit() {
      console.log('submit')
    }
  }
}
</script>
```

- 重写内容
::: 重写内容弹框的示例用法
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="showModal">
      展示消息弹框
    </jd-button>
    <jd-message v-model="isShow"
      type="MSG_TYPE_INFO"
      :title="'普通消息'"
      :sub-title="'这就是一个普通消息的弹框提示'"
      @submit="submit">
      <div>重写后的消息内容</div>
    </jd-message>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showModal() {
      this.isShow = true
    },
    submit() {
      console.log('submit')
    }
  }
}
</script>
```

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type     | 弹框类型     | string | MSG_TYPE_SUCCESS/MSG_TYPE_FAIL/MSG_TYPE_INFO | '' |
| title    | 标题         | string | - | '' |
| subTitle        | 副标题         | string | - | '' |
| buttonText      | 操作按钮文字    | string | - | '确定' |
| showClose       | 是否展示关闭按钮 | boolean | - | true |
| hasCancelButton | 是否有取消按钮   | boolean | - | true |

## emit
- `submit`: 确定按钮提交事件
