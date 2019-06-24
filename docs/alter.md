# 弹框

## 作用
- 通用弹框组件, 并支持各种diy

## 依赖
- `el-dialog`
- `jd-button`

## 使用

```bash
# js
import { Alter } from 'vue-jd-ui'
Vue.use(Alter)
# html
<jd-alter v-model="isShow"></jd-alter>
```
## 例子
- 基础示例
::: 基础使用示例
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="toggle">展示弹框</jd-button>
    <jd-alter v-if="isShow"
      title="示例"
      :hasCancelButton="true"
      :cancelText="'隐藏弹框'"
      :buttonText="'提交'"
      :showClose="true"
      :width="'500px'"
      :closeOnClickModal="true"
      @cancel="cancel"
      @close-handle="closeHandle"
      @click="submit">
      <div style="padding-top: 10px; padding-bottom: 10px;">内容</div>
    </jd-alter>
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
    // 展示与否
    toggle(val) {
      this.isShow = !this.isShow
    },
    // 取消
    cancel() {
      console.log('cancel event')
      this.isShow = false
    },
    // 取消按钮绑定事件
    closeHandle() {
      console.log('cancel button click')
      this.isShow = false
    },
    // 提交按钮绑定事件
    submit() {
      console.log('submit')
      this.isShow = false
    }
  }
}
</script>
```

- 不含标题
::: 不含标题的应用示例
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="toggle">展示弹框</jd-button>
    <jd-alter v-if="isShow"
      title=""
      :hasCancelButton="true"
      :cancelText="'隐藏弹框'"
      :buttonText="'提交'"
      :showClose="true"
      :width="'500px'"
      :closeOnClickModal="true"
      @cancel="cancel"
      @close-handle="closeHandle"
      @click="submit">
      <div style="padding-top: 10px; padding-bottom: 10px;">内容</div>
    </jd-alter>
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
    // 展示与否
    toggle(val) {
      this.isShow = !this.isShow
    },
    // 取消
    cancel() {
      console.log('cancel event')
      this.isShow = false
    },
    // 取消按钮绑定事件
    closeHandle() {
      console.log('cancel button click')
      this.isShow = false
    },
    // 提交按钮绑定事件
    submit() {
      console.log('submit')
      this.isShow = false
    }
  }
}
</script>
```

- 不含底部
::: 不含底部的应用示例
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="toggle">展示弹框</jd-button>
    <jd-alter v-if="isShow"
      title="标题"
      :hasCancelButton="true"
      cancelText="隐藏弹框"
      buttonText=""
      :showClose="true"
      :width="'500px'"
      :closeOnClickModal="true"
      @cancel="cancel"
      @close-handle="closeHandle"
      @click="submit">
      <div style="padding-top: 10px; padding-bottom: 10px;">内容</div>
    </jd-alter>
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
    // 展示与否
    toggle(val) {
      this.isShow = !this.isShow
    },
    // 取消
    cancel() {
      console.log('cancel event')
      this.isShow = false
    },
    // 取消按钮绑定事件
    closeHandle() {
      console.log('cancel button click')
      this.isShow = false
    },
    // 提交按钮绑定事件
    submit() {
      console.log('submit')
      this.isShow = false
    }
  }
}
</script>
```

- 不含顶部和底部
::: 不含顶部和底部的应用示例
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="toggle">展示弹框</jd-button>
    <jd-alter v-if="isShow"
      title=""
      buttonText=""
      :width="'500px'"
      :closeOnClickModal="true">
      <div style="padding-top: 10px; padding-bottom: 10px; text-align: center;">内容</div>
    </jd-alter>
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
    // 展示与否
    toggle(val) {
      this.isShow = !this.isShow
    }
  }
}
</script>
```

- 重写顶部
::: 重写顶部的应用示例
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="toggle">展示弹框</jd-button>
    <jd-alter v-if="isShow"
      :hasCancelButton="true"
      cancelText="隐藏弹框"
      buttonText="确定"
      :width="'500px'"
      :closeOnClickModal="true"
      @cancel="cancel"
      @close-handle="closeHandle"
      @click="submit">
      <div slot="alter-header">
        <h1 style="text-align: center;">header</h1>
      </div>
      <div style="padding-top: 10px; padding-bottom: 10px;">内容</div>
    </jd-alter>
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
    // 展示与否
    toggle(val) {
      this.isShow = !this.isShow
    },
    // 取消
    cancel() {
      console.log('cancel event')
      this.isShow = false
    },
    // 取消按钮绑定事件
    closeHandle() {
      console.log('cancel button click')
      this.isShow = false
    },
    // 提交按钮绑定事件
    submit() {
      console.log('submit')
      this.isShow = false
    }
  }
}
</script>
```

- 重写底部
::: 重写底部的应用示例
```html
<template>
  <div>
    <jd-button style="width: 120px; height: 40px; line-height: 40px;" @click="toggle">展示弹框</jd-button>
    <jd-alter v-if="isShow"
      title="标题"
      cancelText="隐藏弹框"
      buttonText="确定"
      :hasCancelButton="true"
      :showClose="true"
      :width="'500px'"
      :closeOnClickModal="true"
      @cancel="cancel">
      <div slot="alter-footer">
        <h1 style="text-align: center;">footer</h1>
      </div>
      <div style="padding-top: 10px; padding-bottom: 10px;">内容</div>
    </jd-alter>
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
    // 展示与否
    toggle(val) {
      this.isShow = !this.isShow
    },
    // 取消
    cancel() {
      console.log('cancel event')
      this.isShow = false
    }
  }
}
</script>
```

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show     | 展示弹框与否     | boolean | true/false | false |
| title    | 弹框左上角标题   | string  | - | '' |
| hasCancelButton     | 是否有取消按钮  | boolean | true/false | true  |
| cancelText    | 取消文本     | string | - | '取消'  |
| buttonText | 弹框右下角主按钮文本的文字   | string | - | ''  |
| showClose | 是否展示关闭按钮   | boolean | true/false | true  |
| width     | 弹框宽度   | string | - | '50%;'  |
| closeOnClickModal | 是否能点击背景关闭弹框   | boolean | true/false | true  |

## emit
- `closeHandle`: 按钮关闭点击事件
- `cancel`: 取消按钮点击事件
- `submit`: 弹框确认点击事件
