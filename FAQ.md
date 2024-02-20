## JavaScript

### [1. 接口响应后，自动中断该接口的其它重复请求](./src/js/fetch-abort.js)

## CSS

### 1. `font-family` 字体类型

- `serif`：衬线字体，就是边角有特殊修饰的字体，比如：宋体。Serif 表示在字的笔划开始及结束的地方有额外的装饰，而且笔划的粗细会因直横的不同而有不同。不适合在线阅读，但打印效果好，适用于页面打印版。
- `sans-serif`：无衬线字体，无特殊修饰的字体。sans 是法语，意思是“没有”。黑体字就是无衬线字体。Sans Serif 则没有这些额外的装饰，笔划粗细大致差不多。网页首选，在线阅读更好辨认。
- `monospace`：等宽字体，每个字母都一样宽的字体。代码编辑器首选。
- `cursive`：手写字体，通常用在图片或标题。
- `fantasy`：艺术字体，通常用在图片或标题。

## HTTP

### [1. Websocket 断开重连](./src/network/websocket/reconnect.html)

## Webpack

### 1. hash、chunkhash、contenthash

- hash：与整个项目有关，项目里有文件修改，所有文件的哈希值都会变化。
- chunkhash：与入口有关，同一入口的文件被视为一个整体，当其中一个文件修改时，同入口的所有文件哈希值发生改变。chunk 有两种，一种是起始入口的 main chunk，另一种是延迟加载的 chunk（动态导入或者 splitChunks 配置）。
- contenthash：只与文件内容有关，文件内容发生改变，才会更改该文件的哈希值。
