## Usage

```sh
# 安装依赖
pnpm i

# 预览静态 HTML 示例
pnpm start

# 启动 JSONP 示例
pnpm start:jsonp

# 启动 DOM 阻塞示例
pnpm start:dom

# 预览 vue 相关示例
pnpm start:vue

# 启动 HTTP 缓存示例
pnpm start:cache
```

## Browser

- [事件循环](./src/browser/event-loop/readme.md)
- [事件委托](./src/browser/event-delegation/readme.md)
- [setTimeout 原理](./src/browser/event-loop/setTimeout.md)
- [V8 垃圾回收](./src/browser/garbage-collection/readme.md)
- [输入 URL 后发生了什么](./src/browser/input-url/readme.md)
- [JS 和 CSS 是如何阻塞 DOM 解析和渲染的](./src/browser/how-js-and-css-block-dom/readme.md)
- [重排和重绘](./src/browser/reflow-and-repaint/readme.md)
- [DOMContentLoaded 和 load](./src/browser/DCL.html)
- [检测是否支持 Webp](./src/browser/check-webp.js)
- [Web Components](./src/browser/web-components/index.html)
- [JSONP](./src/browser/jsonp/client.html)

## JavaScript

- [原型链](./src/js/prototype-chain/readme.md)
- [块级作用域](./src/js/scope/block.md)
- [作用域链](./src/js/scope/chain.md)
- [闭包](./src/js/scope/closure.md)
- [this](./src/js/this/readme.md)
- [类型判断](./src/js/types.js)
- [继承](./src/js/extend.js)
- [Promises/A+ 规范实现](./src/js/promise/index.js)
- [Generator+Promise 模拟 async/await](./src/js/generator/co.js)
- [简易生成器模拟实现](./src/js/generator/index.js)
- [异步延迟函数](./src/js/sleep.js)

## 手写题

- [new](./src/handwritten/fake-new.js)
- [instanceof](./src/handwritten/instance-of.js)
- [call, apply, bind](./src/handwritten/this-func.js)
- [数组方法：unique, map, reduce, etc](./src/handwritten/array.js)
- [深拷贝](./src/handwritten/deep-clone.js)
- [防抖](./src/handwritten/debounce.js)
- [节流](./src/handwritten/throttle.js)
- [compose 函数](./src/handwritten/compose.js)
- [函数柯里化](./src/handwritten/curry.js)
- [LRU 缓存](./src/handwritten/LRU/v2.js)
- [事件总线（发布订阅）](./src/handwritten/event-emitter.js)
- [链式 find](./src/handwritten/find-chain.js)
- [可延迟执行的链式操作](./src/handwritten/lazy-man.js)
- [并发数控制](./src/handwritten/async-limit/v2.js)
- [Promise.map 并发数控制](./src/handwritten/async-limit/map.js)
- [trim](./src/handwritten/trim.js)
- [大数加法](./src/handwritten/big-add.js)
- [简易虚拟 DOM](./src/handwritten/vnode.html)
- [检测循环引用](./src/handwritten/is-circular.js)
- [对象扁平化](./src/handwritten/flatten.js)
- [将列表还原成树](./src/handwritten/list2tree.js)
- [打乱数组](./src/handwritten/shuffle.js)
- [无限累加函数](./src/handwritten/sum.js)
- [字符串压缩编码](./src/handwritten/string-compress.js)
- [页面出现次数最多的标签](./src/handwritten/frequent-tags.js)
- [字符串中出现次数最多的字符及次数](./src/handwritten/frequent-char.js)
- [random 方法](./src/handwritten/random.js)
- [带权重的抽奖方法](./src/handwritten/lotto.js)
- [解析 URL 参数](./src/handwritten/querystring.js)
- [异步 sum/add](./src/handwritten/sum-async.js)
- [随机六位数字验证码：重复/不可重复](./src/handwritten/sms-code.js)
- [驼峰和横线命名风格互转](./src/handwritten/naming-case.js)
- [lowerCase](./src/handwritten/lower-case.js)
- [模板渲染](./src/handwritten/template.js)
- [二进制和十进制互转](./src/handwritten/bin-dec.js)
- [数值的 IEEE-754 表示](./src/handwritten/IEEE-754.js)
- [lodash.get](./src/handwritten/lodash/get.js)
- [lodash.chunk](./src/handwritten/lodash/chunk.js)
- [lodash.keyBy](./src/handwritten/lodash/key-by.js)
- [lodash.groupBy](./src/handwritten/lodash/groupBy.js)
- [lodash.intersection](./src/handwritten/lodash/intersection.js)
- [(a == 1 && a == 2 && a == 3)](./src/handwritten/auto-plus.js)
- [二叉树最大深度](https://www.nowcoder.com/practice/8a2b2bf6c19b4f23a9bdb9b233eefa73?tpId=295)
- [合并两个有序数组](https://www.nowcoder.com/practice/89865d4375634fc484f3a24b7fe65665?tpId=295)
- [两数之和](https://www.nowcoder.com/practice/20ef0972485e41019e39543e8e895b7f?tpId=295)
- [第 K 大的数](./src/handwritten/kth-num.js)

## HTML & Style

- [BFC（Block Formatting Context）](src/style/BFC/readme.md)
- [clientTop, clientWidth, scrollHeight, offsetTop, etc](./src/style/rect/index.html)
- [控制元素的显示和隐藏](./src/style/show-or-hide.html)
- [响应式适配不同尺寸的移动设备](./src/style/responsive-by-rem/rem.less)
- [高度始终为宽度的一半](./src/style/height-half-width.html)
- [可拖拽元素](./src/style/drag.html)
- [瀑布流布局](./src/style/waterfall/js.html)

## 性能优化
- [简述](./src/performance/readme.md)
- [async 和 defer](./src/performance/async-vs-defer.md)
- [**前端优化之旅**](https://www.alienzhou.com/projects/fe-performance-journey/)
- [原生支持的图片延迟加载](./src/performance/img-lazy.html)
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
- [301 和 302 的区别](https://zhuanlan.zhihu.com/p/93031392)
- [GET 可以有 body 吗？](https://zhuanlan.zhihu.com/p/456921996)

## 安全

- [XSS 跨站脚本](./src/security/xss.md)
- [CSRF 跨站请求伪造](./src/security/csrf.md)
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
- [labuladong 的算法小抄](https://labuladong.gitee.io/algo/)
- [尤雨溪讲解 Vue 核心实现](https://www.bilibili.com/video/BV1d4411v7UX)
- [玩转 Vue 3 全家桶](https://time.geekbang.org/column/intro/100094401?code=p5I8okGnRHfR67OkuyktunHxGUUgxaVlm02vdhIdVa4%3D&source=app_share&page=A)
- [2021前端岗面试整理](https://juejin.cn/post/6991724298197008421)

