## Usage

```sh

pnpm i              # 安装依赖
pnpm start          # 预览静态 HTML 示例
pnpm start:jsonp    # JSONP 示例
pnpm start:proxy    # 反向代理示例
pnpm start:dom      # DOM 阻塞示例
pnpm start:vue      # 预览 vue 相关示例
pnpm start:cache    # HTTP 缓存示例
```

## Browser

- [事件循环](./src/browser/event-loop/readme.md)
- [事件循环图解](http://latentflip.com/loupe/?code=)
- [事件委托](./src/browser/event-delegation/readme.md)
- [事件捕获和冒泡](./src/browser/event-delegation/bubble-capture.html)
- [setTimeout 原理](./src/browser/event-loop/setTimeout.md)
- [setTimeout 的最小时延](https://q.shanyue.tech/fe/js/708.html)
- [V8 垃圾回收](./src/browser/garbage-collection/readme.md)
- [输入 URL 后发生了什么](./src/browser/input-url/readme.md)
- [JS 和 CSS 是如何阻塞 DOM 解析和渲染的](./src/browser/dom-blocking/readme.md)
- [重排和重绘](./src/browser/reflow-and-repaint/readme.md)
- [DOMContentLoaded 和 load](./src/browser/DCL.html)
- [检测是否支持 Webp](./src/browser/check-webp.js)
- [Web Components](./src/browser/web-components/index.html)
- [JSONP](./src/browser/cross-origin/jsonp/client.html)
- [反向代理](./src/browser/cross-origin/reverse-proxy/conf/nginx.conf)
- [Copy, Paste, Selection, Clipboard](https://codepen.io/justorez/pen/XWxNPwb)
- [DOM 绘制成图片](./src/browser/dom-to-img/index.html)
- [浏览器指纹](./src/browser/fingerprint.html)
- [检测网络环境](https://codepen.io/justorez/pen/NWoQQPW)

## JavaScript

- [原型链](./src/js/prototype-chain/readme.md)
- [块级作用域](./src/js/scope/block.md)
- [作用域链](./src/js/scope/chain.md)
- [闭包](./src/js/scope/closure.md)
- [this](./src/js/this/readme.md)
- [类型判断](./src/js/types.js)
- [继承](./src/js/extend.js)
- [Number 最大数、最大安全整数、EPSILON](./src/js/number.md)
- [解决 0.1 + 0.2 不等于 0.3](./src/js/float.js)
- [Promises/A+ 规范实现](./src/js/promise/index.js)
- [Generator+Promise 模拟 async/await](./src/js/generator/co.js)
- [Generator Babel](./src/js/generator/index.js)
- [Intl.Segmenter](./src/js/intl/split-emoji.js)

## 手写题

### ES API
- [new](./src/handwritten/es/new.js)
- [instanceof](./src/handwritten/instance-of.js)
- [call/apply](./src/handwritten/es/call.js)
- [bind/softBind](./src/handwritten/es/bind.js)
- [sleep/sleepSync/delay](./src/handwritten/es/sleep.js)
- [array.reduce](./src/handwritten/es/array.reduce.js)
- [array.flat](./src/handwritten/es/array.flat.js)
- [array: unique, map...](./src/handwritten/array.js)
- [string.trim](./src/handwritten/es/string.trim.js)
- [string.toLowerCase](./src/handwritten/es/string.lowerCase.js)
- [async 函数简易实现](./src/handwritten/es/async-func.js)

### Lodash API
- [防抖](./src/handwritten/lodash/debounce.js)
- [节流](./src/handwritten/lodash/throttle.js)
- [深拷贝](./src/handwritten/lodash/cloneDeep.js)
- [isEqual](./src/handwritten/lodash/isEqual.js)
- [flowRight](./src/handwritten/lodash/compose.js)
- [shuffle](./src/handwritten/lodash/shuffle.js)
- [sample/sampleSize](./src/handwritten/lodash/sample.js)
- [get](./src/handwritten/lodash/get.js)
- [set](./src/handwritten/lodash/set.js)
- [keyBy](./src/handwritten/lodash/keyBy.js)
- [maxBy](./src/handwritten/lodash/maxBy.js)
- [groupBy](./src/handwritten/lodash/groupBy.js)
- [omit/omitBy](./src/handwritten/lodash/omit.js)
- [chunk](./src/handwritten/lodash/chunk.js)
- [template](./src/handwritten/lodash/template.js)
- [camelCase](./src/handwritten/lodash/namingCase.js)
- [kebabCase](./src/handwritten/lodash/namingCase.js)
- [intersection](./src/handwritten/lodash/intersection.js)

### 逻辑题
- [函数柯里化](./src/handwritten/curry.js)
- [LRU 缓存](./src/handwritten/LRU/v2.js)
- [事件总线（发布订阅）](./src/handwritten/event-emitter.js)
- [链式 find](./src/handwritten/find-chain.js)
- [可延迟执行的链式操作](./src/handwritten/lazy-man.js)
- [并发数控制](./src/handwritten/async-limit/v2.js)
- [Promise.map 并发数控制](./src/handwritten/async-limit/map.js)
- [大数加法](./src/handwritten/big-add.js)
- [简易虚拟 DOM](./src/handwritten/vnode.html)
- [检测循环引用](./src/handwritten/is-circular.js)
- [对象扁平化](./src/handwritten/flatten.js)
- [将列表还原成树](./src/handwritten/list2tree.js)
- [无限累加函数](./src/handwritten/sum.js)
- [字符串压缩编码](./src/handwritten/string-compress.js)
- [页面出现次数最多的标签](./src/handwritten/frequent-tags.js)
- [字符串中出现次数最多的字符及次数](./src/handwritten/frequent-char.js)
- [random 方法](./src/handwritten/random.js)
- [带权重的抽奖方法](./src/handwritten/lotto.js)
- [解析 URL 参数](./src/handwritten/querystring.js)
- [异步 sum/add](./src/handwritten/sum-async.js)
- [随机六位数字验证码：重复/不可重复](./src/handwritten/sms-code.js)
- [二进制和十进制互转](./src/handwritten/bin-dec.js)
- [数值的 IEEE-754 表示](./src/handwritten/IEEE-754.js)
- [带过期时间的 localStorage](./src/handwritten/localstorage.html)
- [判断合法括号字符串](./src/handwritten/is-valid-brackets.js)
- [去除字符串中出现次数最少的字符](./src/handwritten/OJ/1.js)
- [数字转汉字](./src/handwritten/OJ/2.js)
- [数字千分位分隔](./src/handwritten/thousandify.js)
- [(a == 1 && a == 2 && a == 3)](./src/handwritten/auto-plus.js)

### 算法与数据结构
- [二叉树最大深度](https://www.nowcoder.com/practice/8a2b2bf6c19b4f23a9bdb9b233eefa73?tpId=295)
- [合并两个有序数组](https://www.nowcoder.com/practice/89865d4375634fc484f3a24b7fe65665?tpId=295)
- [两数之和](https://www.nowcoder.com/practice/20ef0972485e41019e39543e8e895b7f?tpId=295)
- [第 K 大的数](./src/handwritten/kth-num.js)
- [全排列](./src/handwritten/fullpermute.js)

## 实践问题

- [前端竞态](./src/other/race-problem.js)

## HTML & Style

- [Block Formatting Context](src/style/BFC/readme.md)
- [clientTop, clientWidth, scrollHeight, offsetTop, etc](./src/style/rect/index.html)
- [层叠上下文](https://codepen.io/justorez/pen/YzBmmNd)
- [Flex 布局](./src/style/flex.md)
- [Grid 自适应布局](./src/style/grid/auto.html)
- [响应式适配不同尺寸的移动设备](./src/style/responsive/rem.less)
- [控制元素的显示和隐藏](https://codepen.io/justorez/pen/XWxNPLm)
- [高度始终为宽度的一半](https://codepen.io/justorez/pen/RwvXXGv)
- [可拖拽元素](https://codepen.io/justorez/pen/eYPBdWa)
- [瀑布流布局](./src/style/waterfall/js.html)
- [SVG Loading](https://codepen.io/justorez/pen/eYPBZrv)
- [CSS 主题切换](https://codepen.io/justorez/pen/rNPXXew)
- [CSS 暗黑模式](https://lea.verou.me/2021/03/inverted-lightness-variables/)
- [CSS 防挡弹幕](./src/style/mask-image/index.html)

## 性能优化

- [简述](./src/performance/readme.md)
- [性能指标计算](./src/performance/timing.html)
- [async 和 defer](./src/performance/async-vs-defer.md)
- [**前端优化之旅**](https://www.alienzhou.com/projects/fe-performance-journey/)
- [原生图片懒加载](./src/performance/img-lazy.html)
- [响应式图片](./src/performance/img-responsive.html)

## Vue

- [Vue3 运行机制](./src/vue/docs/v3/index.md)
- [Vue2 迷你实现](https://github.com/vue-hotel/mini-vue-2)
- [Vue3 迷你实现](https://github.com/cuixiaorui/mini-vue)
- [nextTick 原理](./src/vue/docs/nextTick/readme.md)
- [组件：引导页](./src/vue/src/components/intro/intro.js)
- [组件：虚拟列表](./src/vue/src/components/virtualList/demo.vue)
- [指令：限制输入框长度，中文字符占 2 位](./src/vue/src/directives/maxlength.js)
- [指令：文本行数超限，展开和收起](./src/vue/src/directives/moreline.js)
- [指令：双指放大，单指拖动](./src/vue/src/directives/zoom.js)
- [指令：图片懒加载](./src/vue/src/directives/lazyload.js)

## 工程化

- [babel-loader 缓存原理](./src/node/babel/cache.md)

## Node.js

- [事件循环](./src/node/event-loop/main.js)

## 网络

- [HTTP 缓存](./src/network/cache/readme.md)
- [HTTP 缓存配置实践](./src/network/cache/config.md)
- [301 和 302 的区别](https://zhuanlan.zhihu.com/p/93031392)
- [Server-Send Events](./src/network/sse/readme.md)
- [GET 可以有 body 吗？](https://zhuanlan.zhihu.com/p/456921996)

## 安全

- [XSS 跨站脚本](./src/security/xss.md)
- [CSRF 跨站请求伪造](./src/security/csrf.md)
- [Content Security Policy](http://www.ruanyifeng.com/blog/2016/09/csp.html)
- [前端安全编码规范](https://segmentfault.com/a/1190000037657222)

## 设计模式

- [观察者模式](./src/design-pattern/observer.js)
- [发布订阅模式](./src/design-pattern/pubsub.js)

## 推荐阅读

- [前端知识路线图](https://roadmap.sh/frontend)
- [前端工程师自检清单](https://juejin.cn/post/6844903830887366670#heading-1)
- [字节前端面试手册](https://bytedance.feishu.cn/base/app8Ok6k9qafpMkgyRbfgxeEnet?from=from_copylink)
- [剑指前端 Offer](https://interview-manual.gitee.io/awesome-interview)
- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601?code=ioec5oi7MyP4QLb8ZUmXV9OiXdifKAeos3f2AKXPNIo%3D&page=A)
- [Hello 算法](https://www.hello-algo.com)
- [尤雨溪讲解 Vue 核心实现](https://www.bilibili.com/video/BV1d4411v7UX)
- [玩转 Vue 3 全家桶](https://time.geekbang.org/column/intro/100094401?code=p5I8okGnRHfR67OkuyktunHxGUUgxaVlm02vdhIdVa4%3D&source=app_share&page=A)
