## VueRouter 实现原理

VueRouter 两种常用的路由模式，Hash 和 History，底层都是借助了浏览器的 [History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)，只是在初始化 `router` 的时候会设置不同的 `base` 地址，如果是 hash 模式，则 `base` 地址是带有 `#` 的，后续调用相关方法进行路由跳转时，会自动拼接上 `#`。

当调用 `router.push()` 跳转路由时，底层调用 `history.pushState()`，实现修改地址栏地址但不刷新页面，同时修改 `router` 内部维护的当前路由，这是一个响应式变量，`RouterView` 组件会监听当前路由的变化，根据路由配置，渲染对应的组件。

另外，针对浏览器前进、后退和 `<a>` 标签跳转等行为，VueRouter 会监听 `popstate` 事件进行相应的路由跳转。之前版本的 hash 模式会监听 `hashchange` 事件，目前最新版已改为统一监听 `popstate` 事件。
