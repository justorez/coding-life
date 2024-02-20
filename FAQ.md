## JavaScript

### [1. 接口响应后，自动中断该接口的其它重复请求](./src/js/fetch-abort.js)

## HTTP

### [1. Websocket 断开重连](./src/network/websocket/reconnect.html)

## 工程化

### 1. Webpack: hash、chunkhash、contenthash

- hash：与整个项目有关，项目里有文件修改，所有文件的哈希值都会变化。
- chunkhash：与入口有关，同一入口的文件被视为一个整体，当其中一个文件修改时，同入口的所有文件哈希值发生改变。chunk 有两种，一种是起始入口的 main chunk，另一种是延迟加载的 chunk（动态导入或者 splitChunks 配置）。
- contenthash：只与文件内容有关，文件内容发生改变，才会更改该文件的哈希值。
