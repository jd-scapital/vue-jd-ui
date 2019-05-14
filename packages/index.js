// common
import Alter from './common/Alter' // common->弹框
import Button from './common/Button'
import Collapse from './common/Collapse' // 下拉展开
import Copy from './common/Copy' // 复制组件
import Input from './common/Input' // 申购input
import JDMessage from './common/Message' // 信息: 成功、失败、叹号信息
import NormalInput from './common/NormalInput' // 普通输入框
import ProgressOrder from './common/Progress' // 步骤条
import Scale from './common/Scale' // 文本缩放
import Select from './common/Select' // 下拉选择
import Span from './common/Span'
import Step from './common/Step' // 步骤组件: 企业新增
import StepBar from './common/StepBar' // 时间轴
import Tab from './common/Tab'
import TabSwiper from './common/TabSwiper' // common->tab的轮播切换
import Title from './common/Title'
import Tooltip from './common/Tooltip' // ! hover提示
import VerifyCode from './common/VerifyCode' // 验证码
import VerifyCodeSmall from './common/VerifyCodeSmall' // 验证码(小)

// common/tab
import NormalTab from './common/NormalTab' // tab容器
import NormalTabPane from './common/NormalTabPane' // tab每个面板

// table
import TodoTable from './table/TodoTable'
import Table from './table/Table'
import ExpandTable from './table/ExpandTable'
import MatchTable from './table/MatchTable'

// echarts
import EchartsHome from './echarts/Home'
import EchartsMatch from './echarts/Match'
import EchartsTab from './echarts/Tab'

import CollapseTransition from 'jd-ui/lib/transitions/collapse-transition'
import locale from 'jd-ui/lib/locale'
import zhLocale from 'jd-ui/lib/locale/lang/zh-CN'
zhLocale.el.pagination.goto = '跳至 '

const components = [
  Alter,
  Button,
  Collapse,
  Copy,
  Input,
  JDMessage,
  NormalInput,
  ProgressOrder,
  Scale,
  Select,
  Span,
  Step,
  StepBar,
  Tab,
  TabSwiper,
  Title,
  Tooltip,
  VerifyCode,
  VerifyCodeSmall,
  NormalTab,
  NormalTabPane,
  TodoTable,
  Table,
  ExpandTable,
  MatchTable,
  EchartsHome,
  EchartsMatch,
  EchartsTab
]

const install = function(Vue, opts = {}) {
  // Vue.prototype.$message = Message
  Vue.component('collapse-transition', CollapseTransition)
  locale.use(zhLocale)
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0',
  install,
  ...components
}
