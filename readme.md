# vue-jd-ui

> 一个部分依赖于element-ui的ui库

## 打包构建
- 打包: `npm run dist:webpack`
- 命令说明
  - 细节
    - 安装依赖: `npm run bootstrap`
    - 入口文件生成: `npm run build:file`
    - utils工具打包处理: `npm run build:utils`
    - 代码格式检测: `npm run lint`
  - 旧打包文件清除: `npm run clean`
  - 版本发布: `npm run pub`


## 文档说明
- [文档目录](./docs-mds/readme.md)
- 示例代码本地运行
  ````
  cd examples
  npm run serve
  ````
- 示例代码部署到`gh-pages`
  ```
  npm run deploy
  ```
## browser
  ```
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  ```
## TODO LIST
- test
