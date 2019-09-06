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
  v-model="value"
  @verifyInfo="verifyInfo">
</jd-normal-input>
```

## 例子
- 基础示例
::: 基础使用示例
```html
<template>
  <jd-normal-input style="width: 300px;margin-top: 10px;"
    :type="'text'"
    :placeholder="'请输入文本'"
    :options="[{name: '北京市', value: '北京市'}]"
    v-model="value"
    @verifyInfo="verifyInfo">
  </jd-normal-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    verifyInfo(info) {
      console.log('info: ', info)
    }
  }
}
</script>
```

- 下拉框示例
::: 下拉框使用示例
```html
<template>
  <jd-normal-input style="width: 300px;margin-top: 10px;"
    :type="'select'"
    :placeholder="'请输入文本'"
    :options="options"
    v-model="value"
    @verifyInfo="verifyInfo">
  </jd-normal-input>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          name: '北京市',
          value: '北京市'
        },
        {
          name: '天津市',
          value: '天津市'
        }
      ]
    }
  },
  methods: {
    verifyInfo(info) {
      console.log('info: ', info)
    }
  }
}
</script>
```

- 多选框示例
::: 多选框使用示例
```html
<template>
  <jd-normal-input style="width: 400px;margin-top: 10px;"
    :type="'multi-select'"
    :placeholder="'请输入文本'"
    :options="options"
    :childValue="childValue"
    v-model="value"
    @verifyInfo="verifyInfo">
  </jd-normal-input>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      childValue: '',
      options: [
        {
          name: '河南省',
          value: 'henan',
          childs: [
            {
              name: '郑州市',
              value: 'zhengzhou'
            },
            {
              name: '漯河市',
              value: 'luohe'
            }
          ]
        },
        {
          name: '天津市',
          value: 'tianjin',
          childs: [
            {
              name: '天津市',
              value: 'tianjin',
            }
          ]
        }
      ]
    }
  },
  methods: {
    verifyInfo(info) {
      console.log('info: ', info)
    }
  }
}
</script>
```

- 验证码示例
::: 验证码使用示例
```html
<template>
  <jd-normal-input style="width: 300px;margin-top: 10px;"
    :type="'verify-code'"
    :placeholder="'请输入文本'"
    :smsPush="smsPush"
    :spare="60"
    v-model="value"
    @verifyInfo="verifyInfo">
  </jd-normal-input>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      smsPush() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              success: true,
              data: 123
            })
          }, 1e3)
        })
      }
    }
  },
  methods: {
    verifyInfo(info) {
      console.log('info: ', info)
    }
  }
}
</script>
```

- 密码示例
::: 密码使用示例
```html
<template>
  <jd-normal-input style="width: 300px;margin-top: 10px;"
    :type="'password'"
    :placeholder="'请输入文本'"
    v-model="value"
    @verifyInfo="verifyInfo">
  </jd-normal-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    verifyInfo(info) {
      console.log('info: ', info)
    }
  }
}
</script>
```

- 普通校验示例
::: 普通校验使用示例
```html
<template>
  <form>
    <jd-normal-input style="width: 300px;margin-top: 10px;"
      :type="'text'"
      :placeholder="'请输入文本'"
      :validator="validator.name"
      :rule="rule.name"
      v-model="model.name"
      @verifyInfo="verifyInfo">
    </jd-normal-input>
    <jd-button style="width: 120px; height: 40px;line-height: 40px;" @click="check">校验</jd-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      model: {
        name: ''
      },
      rule: {
        name: { name: '姓名', required: true, checked: false, ok: false, trigger: 'blur' }
      },
      validator: {
        name(rule, value, callback) {
          if (!value) {
            callback('不能为空')
          }
          else if (value !== '9') {
            callback('应该是9')
          }
          else {
            callback()
          }
        }
      }
    }
  },
  methods: {
    verifyInfo(info) {
      console.log('info: ', info)
    },
    // 校验
    check() {
      this.rule.name.checked = true
    }
  }
}
</script>
```


## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value      | 输入框值  | string | - | '' |
| placeholder| 输入框没值时默认提示语 | string | - | '' |
| type       | 类型  | string | text/select/multi-select/verify-code/password | 'text' |
| childValue  | type为select时, 下拉框子级下拉框值  | string | - | '' |
| options     | type为select时, 下拉选项 | array | - | [] |
| validator   | 校验器(一般用于自定义校验) | function | - | function() {} |
| rule     | 规则 | object | - | {} |
| smsPush  | 短信发送函数 | function | - | () => { return new Promise() }) |
| spare  | 倒计时时间 | number | - | 30(单位是秒) |


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

## Emit
- `verifyInfo`: 验证码验证的结果
