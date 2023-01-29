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
- [setTimeout 原理](./src/browser/event-loop/setTimeout.md)
- [事件委托](./src/browser/event-delegation/readme.md)
- [V8 垃圾回收](./src/browser/garbage-collection/readme.md)
- [输入 URL 后发生了什么](./src/browser/input-url/readme.md)
- [JS 和 CSS 是如何阻塞 DOM 解析和渲染的](./src/browser/how-js-and-css-block-dom/readme.md)
- [async 和 defer](./src/browser/optimization/async-vs-defer.md)
- [性能优化](./src/browser/optimization/readme.md)
- [重排和重绘](./src/browser/reflow-and-repaint/readme.md)
- [JSONP](./src/browser/jsonp/client.html)

## JavaScript

- [原型链](./src/js/prototype-chain/readme.md)
- [块级作用域](./src/js/scope/block.md)
- [作用域链](./src/js/scope/chain.md)
- [闭包](./src/js/scope/closure.md)
- [this](./src/js/this/readme.md)
- [类型判断](./src/js/types.js)
- [继承](./src/js/extend.js)
- [new 模拟实现](./src/js/fake-new.js)
- [instanceof 模拟实现](./src/js/instance-of.js)
- [call、apply、bind 模拟实现](./src/js/this-func.js)
- [深拷贝](./src/js/deep-clone.js)
- [防抖](./src/js/debounce.js)
- [节流](./src/js/throttle.js)
- [数组常用方法实现](./src/js/array.js)
- [函数柯里化](./src/js/curry.js)
- [Promises/A+ 规范实现](./src/js/promise/index.js)
- [简易生成器模拟实现](./src/js/generator/index.js)
- [生成器+Promise 模拟 async/await](./src/js/generator/co.js)
- [字符串模板](./src/js/template.js)
- [异步延迟函数](./src/js/sleep.js)
- [事件总线（发布订阅）](./src/js/event-emitter.js)
- [可延迟执行的链式操作](./src/js/chain-with-timeout.js)
- [并发数控制的异步调度器](./src/js/concurrency-limit/v1.js)

## Style

- [控制元素的显示和隐藏](./src/style/show-or-hide.html)
- [响应式适配不同尺寸的移动设备](./src/style/responsive-by-rem/rem.less)

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

## Node.js

- [事件循环](./src/node/event-loop/main.js)

## 网络

- [HTTP 缓存](./src/network/cache/readme.md)

## 安全

- [XSS 跨站脚本](./src/security/xss.md)
- [CSRF 跨站请求伪造](./src/security/csrf.md)
- [前端安全编码规范](https://segmentfault.com/a/1190000037657222)

## 推荐阅读

- [前端知识体系整理](https://jsgodroad.com/interview)
- [前端工程师自检清单](https://juejin.cn/post/6844903830887366670#heading-1)
- [字节前端面试手册](https://bytedance.feishu.cn/base/app8Ok6k9qafpMkgyRbfgxeEnet?from=from_copylink)
- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/100033601?code=ioec5oi7MyP4QLb8ZUmXV9OiXdifKAeos3f2AKXPNIo%3D&page=A)
- [labuladong 的算法小抄](https://labuladong.gitee.io/algo/)
- [尤雨溪讲解 Vue 核心实现](https://www.bilibili.com/video/BV1d4411v7UX)
- [玩转 Vue 3 全家桶](https://time.geekbang.org/column/intro/100094401?code=p5I8okGnRHfR67OkuyktunHxGUUgxaVlm02vdhIdVa4%3D&source=app_share&page=A)
- [2021前端岗面试整理](https://juejin.cn/post/6991724298197008421)
- [剑指前端 Offer](https://interview-manual.gitee.io/awesome-interview)
