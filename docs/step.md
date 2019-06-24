## 步骤组件

### 作用
- 自定义设计的步骤ui

### 依赖
- `jd-scale`

## 使用
- 基础示例
```bash
# js
import { Step } from 'vue-jd-ui'
Vue.use(Step)
# html
<jd-step></jd-step>
```
## 例子
::: 基础使用示例
```html
<template>
  <jd-step
    :type="type"
    :steps="steps"
    :step="step">
  </jd-step>
</template>
<script>
export default {
  data() {
    return {
      // 当前阶段(根据index取值, 第一个是1, 而非0
      step: 1,
      // 类型
      type: 'small',
      // 步骤
      steps: [
        {
          // 序号
          index: 1,
          // 标题文本
          text: '企业信息',
          // 是否激活
          active: true
        },
        {
          index: 2,
          text: '法人信息',
          active: false
        }
      ]
    }
  }
}
</script>
```

- 可点击
::: 可点击的示例用法
```html
<template>
  <jd-step
    :type="type"
    :steps="steps"
    :step="step"
    @change="stepClick">
  </jd-step>
</template>
<script>
export default {
  data() {
    return {
      // 当前阶段(根据index取值, 第一个是1, 而非0
      step: 2,
      // 类型
      type: 'small',
      // 步骤
      steps: [
        {
          // 序号
          index: 1,
          // 标题文本
          text: '企业信息',
          // 是否激活
          active: true
        },
        {
          index: 2,
          text: '法人信息',
          active: false
        }
      ]
    }
  },
  methods: {
    stepClick() {
      console.log('click')
    }
  }
}
</script>
```

- 设置激活颜色
::: 设置激活颜色的示例用法
```html
<template>
  <jd-step
    :type="type"
    :steps="steps"
    :step="step"
    :color="color">
  </jd-step>
</template>
<script>
export default {
  data() {
    return {
      // 当前阶段(根据index取值, 第一个是1, 而非0
      step: 2,
      // 类型
      type: 'small',
      // 步骤
      steps: [
        {
          // 序号
          index: 1,
          // 标题文本
          text: '企业信息',
          // 是否激活
          active: true
        },
        {
          index: 2,
          text: '法人信息',
          active: false
        },
        {
          index: 3,
          text: '董事信息',
          active: false
        }
      ],
      color: '#1EA6E9'
    }
  }
}
</script>
```

- 展示当前step
::: 设置是否展示当前step的示例用法
```html
<template>
  <jd-step
    :type="type"
    :steps="steps"
    :step="step"
    :current-step.sync="currentStep"
    @change="stepClick">
  </jd-step>
</template>
<script>
export default {
  data() {
    return {
      // 当前阶段(根据index取值, 第一个是1, 而非0
      step: 2,
      // 类型
      type: 'small',
      // 步骤
      steps: [
        {
          // 序号
          index: 1,
          // 标题文本
          text: '企业信息',
          // 是否激活
          active: true
        },
        {
          index: 2,
          text: '法人信息',
          active: false
        },
        {
          index: 3,
          text: '董事信息',
          active: false
        }
      ],
      // 当前阶段
      currentStep: 2
    }
  },
  methods: {
    stepClick(step) {
      console.log('step: ', step)
    }
  }
}
</script>
```

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type     | 类型           | string | middle/small | small |
| steps    | 步骤           | array  | - | [] |
| step     | 当前阶段        | number | - | 1  |
| color    | 激活颜色设置     | string | - | ''  |
| currentStep | 当前阶段   | number | - | null  |

## emit
- `change`: 步骤点击变更事件
