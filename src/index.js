/* Automatically generated by './build/bin/build-entry.js' */

import Alter from '../packages/alter/index.js'
import Button from '../packages/button/index.js'
import Collapse from '../packages/collapse/index.js'
import Copy from '../packages/copy/index.js'
import EchartsHome from '../packages/echarts-home/index.js'
import EchartsMatch from '../packages/echarts-match/index.js'
import EchartsTab from '../packages/echarts-tab/index.js'
import ElLoading from '../packages/el-loading/index.js'
import ElMessage from '../packages/el-message/index.js'
import Icon from '../packages/icon/index.js'
import Input from '../packages/input/index.js'
import Message from '../packages/message/index.js'
import NormalInput from '../packages/normal-input/index.js'
import NormalInputSelect from '../packages/normal-input-select/index.js'
import NormalTab from '../packages/normal-tab/index.js'
import NormalTabPane from '../packages/normal-tab-pane/index.js'
import Progress from '../packages/progress/index.js'
import Scale from '../packages/scale/index.js'
import Select from '../packages/select/index.js'
import Span from '../packages/span/index.js'
import Step from '../packages/step/index.js'
import StepBar from '../packages/step-bar/index.js'
import Tab from '../packages/tab/index.js'
import TabSwiper from '../packages/tab-swiper/index.js'
import Title from '../packages/title/index.js'
import Tooltip from '../packages/tooltip/index.js'
import Table from '../packages/table/index.js'
import TableExpand from '../packages/table-expand/index.js'
import TableMatch from '../packages/table-match/index.js'
import TableTodo from '../packages/table-todo/index.js'
import VerifyCode from '../packages/verify-code/index.js'
import VerifyCodeSmall from '../packages/verify-code-small/index.js'

import CollapseTransition from 'vue-jd-ui/src/transitions/collapse-transition'

const components = [
  Alter,
  Button,
  Collapse,
  Copy,
  EchartsHome,
  EchartsMatch,
  EchartsTab,
  Icon,
  Input,
  Message,
  NormalInput,
  NormalInputSelect,
  NormalTab,
  NormalTabPane,
  Progress,
  Scale,
  Select,
  Span,
  Step,
  StepBar,
  Tab,
  TabSwiper,
  Title,
  Tooltip,
  Table,
  TableExpand,
  TableMatch,
  TableTodo,
  VerifyCode,
  VerifyCodeSmall,
  CollapseTransition
]

const install = function(Vue, opts = {}) {
  Vue.component('collapse-transition', CollapseTransition)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(ElLoading.directive)

  Vue.prototype.$loading = ElLoading.service
  Vue.prototype.$message = ElMessage
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0-beta.13',
  install,
  CollapseTransition,
  Loading: ElLoading,
  Alter,
  Button,
  Collapse,
  Copy,
  EchartsHome,
  EchartsMatch,
  EchartsTab,
  ElLoading,
  ElMessage,
  Icon,
  Input,
  Message,
  NormalInput,
  NormalInputSelect,
  NormalTab,
  NormalTabPane,
  Progress,
  Scale,
  Select,
  Span,
  Step,
  StepBar,
  Tab,
  TabSwiper,
  Title,
  Tooltip,
  Table,
  TableExpand,
  TableMatch,
  TableTodo,
  VerifyCode,
  VerifyCodeSmall
}
