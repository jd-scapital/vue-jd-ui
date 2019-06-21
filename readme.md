### 打包构建
- 打包: `npm run dist`
- 命令说明
  - 安装依赖: `npm run bootstrap`
  - 入口文件生成: `npm run build:file`
  - utils工具打包处理: `npm run build:utils`
  - 代码格式检测: `npm run lint`
- 旧打包文件清除: `npm run clean`

### 文档说明
- [文档目录](./docs/readme.md)
- 示例代码运行
  ````
  cd examples
  npm run serve
  ````
### browser
  ```
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  ```
### TODO LIST
- test
