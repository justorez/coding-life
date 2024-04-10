## JS

### 原型

原型是一种实现对象属性继承和共享机制，它是一个关联到构造函数的`.prototype`属性的对象，新创建的对象实例会隐式链接到其构造函数的原型，形成了 js 中的原型链继承结构。

### 原型链

原型链是 js 中由对象的原型及其原型的原型逐级向上连接形成的链式结构，用于在对象自身没有某个属性或方法时，按照链式顺序搜索继承的属性和方法。

### 闭包

闭包是指在函数执行完毕后，其内部函数仍能访问该函数作用域内变量的特性。

通过闭包，可以实现私有化变量。

### 事件循环

事件循环是一种异步编程模型，会不断地从任务队列中取出任务并放入执行栈执行，直到任务队列为空为止。这种机制保证了 JS 能够在单线程的基础上高效地处理异步操作，避免阻塞主线程。

任务可以分为两类：宏任务和微任务都是异步任务
- 宏任务队列：`setTimeout`、`setInterval`、`I/O`、`UI rendering` 等。
- 微任务队列：`queueMicrotask`、`Promise`、`MutationObserver`、`async/await`、`process.nextTick`（Node.js）等。

执行流程通常如下：
1. 执行全局脚本同步代码，形成执行栈。
2. 遇到异步任务时，不阻塞主线程，继续执行后续的同步代码。<br>
   待异步任务完成后，其回调函数会被添加到相应的任务队列中等待被执行。
3. 当同步代码执行完毕，清空执行栈。
4. 检查微任务队列，如果有微任务，执行所有微任务并将它们的结果（如果有）推入新的微任务队列，直到微任务队列为空。
5. 渲染 UI（仅在浏览器环境下）。
6. 检查宏任务队列，如果有宏任务，取出第一个任务并放入执行栈执行。
7. 重复上述步骤。

### 箭头函数和普通函数的区别

1. 箭头函数没有自己的 `this`，它们会捕获其所在上下文的 `this` 值，因此 `this` 的值在箭头函数定义时就已经确定了，不会随着调用方式的改变而改变。而普通函数的 `this` 取决于函数的调用方式。
2. 箭头函数没有 `arguments` 和 `super`。
3. 箭头函数不能用作构造函数，没有 `prototype` 属性，无法访问 `new.target`。使用 `new` 调用它们会引发 TypeError。
4. 箭头函数不能在其主体中使用 `yield`，也不能作为生成器函数创建。

### [图片懒加载](./src/browser/lazy-load/IntersectionObserver.html)

```js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(change => {
        if (change.isIntersecting) {
            const img = change.target
            if (img.dataset.src) {
                img.src = img.dataset.src
                observer.unobserve(img)
            }
        }
    })
})
observer.observe(img)
```

### [单点登录（Single Sign On）](https://juejin.cn/post/6898630134530752520#heading-7)

1. 用户访问 A 系统，没有登录凭证（ticket），自动跳转到 SSO 并附带回调地址<br>
   [https://sso.com?redirect=a.com/callback](#)
2. 输入账号密码登录 SSO，账号密码验证成功
    1. 记录用户在 SSO 的登录状态（cookie 或 token 等方式）
    2. 下发一个 ticket
3. 浏览器被重定向到系统 A 的回调地址，并附带一个 code<br>
   [https://a.com/callback?code=xxx](#)<br>
   系统 A 通过 code 去 SSO 换取 ticket（code 一次性，可以暴露在 URL 中，换完 ticket 就失效）
4. A 系统拿到 ticket 后，将 ticket 设置到自己域名下的 cookie 里
5. A 系统后续请求只需携带 cookie，后台取出 ticket 去 SSO 校验，校验成功后正常处理业务请求
6. 然后用户第一次访问 B 系统，没有 ticket，自动跳转到 SSO 并附带回调地址
7. SSO 已登录过，直接下发 ticket，步骤同 3-5

### [接口响应后，自动中断该接口的其它重复请求](./src/js/fetch/abort.ts)

## HTTP

### [输入 URL 到页面加载的过程](./src/browser/input-url/index.md)

### [强制缓存和协商缓存](./src/network/cache/readme.md)

### 缓存最佳实践

1. 文件路径中带有 hash 值：一年的强缓存。因为该文件的内容发生变化时，会生成一个带有新的 hash 值的 URL。前端将会发起一个新的 URL 的请求。配置响应头 `Cache-Control: public,max-age=31536000,immutable`
2. 文件路径中不带有 hash 值：协商缓存。大部分为 public 下文件。配置响应头 `Cache-Control: no-cache` 与 `etag/last-modified`
3. 当处理长久缓存时，不能打包为一个大的 `bundle.js`，因为一行业务代码的改变，将导致整个项目的长久缓存失效，需要按代码更新频率分为多个 `chunk` 进行打包，细粒度的控制缓存。

### [HTTPS 握手过程](./src/network/https/readme.md)

### [Websocket 断开重连](./src/network/websocket/reconnect.html)

## Vue

### Vue3 进行了哪些优化更新？

1. 更快的渲染速度
    - 静态提升：标记不变的静态内容（节点或属性），减少运行时计算和 DOM 操作
    - 基于 Proxy 的响应式系统：更细粒度，更高效，支持更多的数据结构
2. 更小的体积
3. 更好的 TypeScript 支持
4. 组合式 API：更加灵活，实现逻辑更易复用
5. 高级特性
    - Teleport：实现元素在 DOM 树任意位置渲染
    - Fragment：允许组件拥有多个根元素

### Vue2 和 Vue3 实现响应式的区别

Vue2 在实例初始化时遍历 data 中的所有属性，使用 `Object.defineProperty` 把这些属性全部转为 getter/setter，getter 中收集依赖，setter 中通知依赖，触发相应的监听回调
1. 遍历对象所有属性，如果对象层次较深，性能不好
2. 无法监听到通过索引访问数组元素的变化，不支持 Map、Set 等数据结构
3. 无法监听动态新增、删除对象属性，只能用特定 `$set`、`$delete` 的方法

Vue3 使用 Proxy 来监控数据的变化
1. Proxy 直接代理整个对象，无需遍历每个属性，并且支持数组、Map、Set 等数据结构
2. Proxy 可以拦截包括读取、赋值、删除在内的几乎所有的对象操作
2. 延迟加载。例如代理对象的属性 A 也是一个对象，只有 A 被访问时，A 才会被转换为响应式对象，A 内部属性的响应式转换同理

### Vue3 Diff

双端比较，相同的节点不动，遇到不同的节点，生成一个数组记录 newChildren 节点在 oldChildren 节点中的索引，如果是新增节点则记为 -1，求出数组的最长递增子序列，这些节点意味着无需移动，仅移动剩余节点和插入新增节点即可。

### [VueRouter 实现原理](./src/vue/docs/router/readme.md)

### [父子组件生命周期执行顺序](https://play.vuejs.org/#eNrtVE2PmzAQ/SuuLyRSCqraU8pG2kYr9UNtV/1QL75QGAhbYyPb0EiI/96xDSRZBdTTnvaUjN8bzxvzZjp6W9dh2wDd0linqqwN0WCaesdEWdVSGdIRBTnpSa5kRQKkBhN0nygQZkDCyIf2tuAtE0ykUmhDKl2QG3vHKngPnEvySyqevQjWTMSRL4nFMDBQ1TwxgBEh8eHVrutcct/HEUbutBR1Y0j7spIZ8BtGEWeURB78BFDf8rIFJJS5R0MOojAHRh0FSYPma4x46MDfFk3XYRxHZ+rohhqNzeVlET5oKfDtOpvCaCqruuSgvtamxOYZ3RKHWCzB3v9+dGdGNbAZz9MDpH+unD/ooz1j9F6BBtUCoxNmElWA8fDd9y9wxP8TiG/TcGQvgN9AS95YjZ72rhEZyj7jObUf3GcuRfFD3x0NCD02ZYVaZu/4jOIn3y+0fpL7Onzj8pjo8RVPhjnZ72S8/aHk2WQuFzlvjcYSSQXorMDfgsdwdHkZ5EnD0bi2kv0iUiCuJz3uppP6LDHJaj2CCs2vBOnQGNsgQJ0jzU2F5dnikkPIZbGyEjYkcFiw9sTfkEsFewVolhn+OWVMS12UzWQM6GWNz7IRZrGEY4xJlQ1mKwzoSE5SU7YLgib8UtLPGp9zuW1PGdMaF81VGdBHNYTTulzEc6YqPpyvM+JjQgZnD3At44yAOWjn5W2Wle2wgIb9c32T7ci084Z15cyKm8n/+sXkL3u8kqYBuZily1FxnJlJeZ6D5zl4wjnw2/2/xuC64/t/lCb6iw==)

1. Parent `setup`
2. Parent `beforeCreate`
3. Parent `created`
4. Parent `beforeMount`
    - Child `setup`
    - Child `beforeCreate`
    - Child `created`
    - Child `beforeMount`
    - Child `mounted`
5. Parent `mounted`
7. Parent `beforeUnmount`
    - Child `beforeUnmount`
    - Child `unmounted`
9. Parent `unmounted`

如果使用了 `KeepAlive`
1. `mounted`
2. Child `activated`
3. Parent `activated`
4. `beforeUnmount`
5. Child `deactivated`
6. Parent `deactivated`
7. `unmounted`

## Webpack

### 构建流程

1.  **初始化参数**：Webpack 从配置文件（如 `webpack.config.js`）和命令行参数中读取配置信息，并合并这些参数以创建最终的构建配置。
2.  **实例化 Compiler 对象**：根据上一步得到的最终配置，Webpack 创建一个 Compiler 对象，这个对象负责整个构建流程的控制。
3.  **注册插件**：Compiler 对象会注册所有配置中指定的插件，这些插件将会监听构建过程中的各种事件钩子（hooks），并在相应阶段执行自定义的逻辑。
4.  **编译开始**：调用 Compiler 对象的 `run` 方法启动编译流程。
5.  **解析入口文件**：根据配置中的 `entry` 属性，Webpack 找到项目的入口起点文件。
6.  **递归解析依赖**：从入口文件开始，Webpack 递归地解析和追踪模块间的依赖关系，这包括 CommonJS、AMD、ES6 模块导入等形式的导入语句。
7.  **编译模块**：对每个模块，Webpack 会按照配置中的 loader 规则，通过调用对应 loader 进行编译转换。Loader 可以用来处理不同类型文件的内容，比如将 TypeScript 转换为 JavaScript，或将 LESS/SCSS 转换成 CSS。
8.  **生成依赖图**：Webpack 将解析到的所有模块及其依赖关系组成一个内部的依赖图，这个图包含了项目中所有模块如何相互关联的信息。
9.  **优化模块**：在依赖图生成之后，Webpack 进行一系列的优化操作，例如代码分割、摇树优化（Tree Shaking）、公共代码提取（CommonsChunkPlugin 或者 SplitChunksPlugin）等。
10. **生成 Chunk**：根据依赖关系和优化策略，Webpack 将相关模块组合成一个个 Chunk（也就是最终要输出的文件）。
11. **输出资源**：最后，Webpack 将每个 Chunk 转换成实际的文件内容，并根据配置的 `output` 设置，将这些文件内容写入到磁盘上的指定位置。

### loader 和 plugin 的区别

- Loader 专注于源文件的转换，应用于单个文件级别，处理模块内容，使其符合模块化标准或转换为另一种格式。
- Plugin 则着眼于整体构建过程的控制与扩展，能够影响多个文件甚至整体构建结果，执行跨模块或与模块无关的操作，如资源管理、优化、环境变量注入、自定义输出等。

### hash、chunkhash、contenthash

- hash：与整个项目有关，项目里有文件修改，所有文件的哈希值都会变化。
- chunkhash：与入口有关，同一入口的文件被视为一个整体，当其中一个文件修改时，同入口的所有文件哈希值发生改变。chunk 有两种，一种是起始入口的 main chunk，另一种是延迟加载的 chunk（动态导入或者 splitChunks 配置）。
- contenthash：只与文件内容有关，文件内容发生改变，才会更改该文件的哈希值。

## CSS

### [BFC (Block Formatting Context)](./src/style/BFC/readme.md)

区块格式化上下文：它定义了一个独立的渲染区域，在这个区域内，内部的盒子（Box）将会按照一套特定的渲染规则进行布局。

BFC 可以用来：
- 包含内部浮动
- 排除外部浮动
- 阻止外边距重叠

### [居中对齐](./src/style/align-center.html)

```css
/* 表格布局 */
.box {
    display: table-cell;
    vertical-align: middle;
}
.box .ball {
    margin: 0 auto;
}

/* 定位 */
.box {
    position: relative;
}
.box .ball {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 弹性布局 */
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 网格布局 */
.box {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
}
```

### meta viewport 标签的作用

- 控制视口宽度：`width=device-width` 表示视口宽度应等于设备的屏幕宽度，即以 CSS 像素（设备独立像素）为单位来设定网页的宽度。在高分辨率的设备上，1px 的 CSS 像素将由大于 1 的物理像素绘制，从而避免出现页面元素缩小的情况。
- 初始缩放比例：`initial-scale=1.0` 指定页面加载时的初始缩放级别为1.0，也就是说网页加载后原始尺寸将与设备屏幕分辨率保持一致，不进行额外的缩放。
