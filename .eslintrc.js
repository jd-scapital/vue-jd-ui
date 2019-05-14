module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  globals: {
    'ga': true
  },
  extends: [ 'plugin:vue/essential', '@vue/standard' ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 2格缩进
    indent: ['error', 2, {SwitchCase: 1}],
    // 必须是单引号
    quotes: ['error', 'single'],
    // 空格不超过2个
    'no-empty': 2,
    // 不能等于null
    'no-eq-null': 2,
    // new 的对象不必须有接收
    'no-new': 0,
    // switch case 不必须加break
    'no-fallthrough': 0,
    // "no-unreachable": 0,
    // 函数 function 和 () 之间不要有空格
    'space-before-function-paren': ['error', 'never'],
    // 代码块不能有尾随空格
    'no-trailing-spaces': 'error',
    // let 定义后在子作用域使用还是报错
    // "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],
    // else/catch换行
    'brace-style': ['error', 'stroustrup'],
    // "vue/no-parsing-error": 0,
    // 正则允许特殊符号
    'no-useless-escape': 0,
    // 多条件判断符号前置
    'operator-linebreak': ['error', 'before']
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
    // ecmaVersion: 6,
    // "ecmaFeatures": {
    //   "jsx": true
    // }
  },
  plugins: [ 'vue', 'html', 'json' ]
}
