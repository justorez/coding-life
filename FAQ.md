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

1. 箭头函数没有独立的 `this`、`arguments` 和 `super` 绑定。其 `this` 值会始终保持为定义时所在作用域的 `this`，无法被修改。
2. 箭头函数不能用作构造函数，没有 `prototype` 属性。使用 new 调用它们会引发 TypeError。它们也无法访问 `new.target` 关键字。
3. 箭头函数不能在其主体中使用 `yield`，也不能作为生成器函数创建。

### [接口响应后，自动中断该接口的其它重复请求](./src/js/fetch-abort.js)

## HTTP

### 缓存最佳实践

1. 文件路径中带有 hash 值：一年的强缓存。因为该文件的内容发生变化时，会生成一个带有新的 hash 值的 URL。前端将会发起一个新的 URL 的请求。配置响应头 `Cache-Control: public,max-age=31536000,immutable`
2. 文件路径中不带有 hash 值：协商缓存。大部分为 public 下文件。配置响应头 `Cache-Control: no-cache` 与 `etag/last-modified`
3. 当处理长久缓存时，不能打包为一个大的 `bundle.js`，因为一行业务代码的改变，将导致整个项目的长久缓存失效，需要按代码更新频率分为多个 `chunk` 进行打包，细粒度的控制缓存。

### [Websocket 断开重连](./src/network/websocket/reconnect.html)

## Vue

### Vue2 和 Vue3 实现响应式的区别

Vue2 在实例初始化时遍历 data 中的所有属性，使用 `Object.defineProperty` 把这些属性全部转为 getter/setter，getter 中收集依赖，setter 中通知依赖，触发相应的监听回调
1. 遍历对象所有属性，如果对象层次较深，性能不好
2. 无法监听到通过索引访问数组元素的变化，不支持 Map、Set 等数据结构
3. 无法监听动态新增、删除对象属性，只能用特定 `$set`、`$delete` 的方法

Vue3 使用 Proxy 来监控数据的变化
1. Proxy 直接代理整个对象，无需遍历每个属性，并且支持数组、Map、Set 等数组结构
2. Proxy 可以拦截包括读取、赋值、删除在内的几乎所有的对象操作
2. 延迟加载。例如代理对象的属性 A 也是一个对象，只有 A 被访问时，A 才会被转换为响应式对象，A 内部属性的响应式转换同理

### Vue3 diff

双端比较，相同的节点不动，遇到不同的节点，生成一个数组记录 newChildren 节点在 oldChildren 节点中的索引，如果是新增节点则记为 -1，求出数组的最长递增子序列，这些节点意味着无需移动，仅移动剩余节点和插入新增节点即可。

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

### hash、chunkhash、contenthash

- hash：与整个项目有关，项目里有文件修改，所有文件的哈希值都会变化。
- chunkhash：与入口有关，同一入口的文件被视为一个整体，当其中一个文件修改时，同入口的所有文件哈希值发生改变。chunk 有两种，一种是起始入口的 main chunk，另一种是延迟加载的 chunk（动态导入或者 splitChunks 配置）。
- contenthash：只与文件内容有关，文件内容发生改变，才会更改该文件的哈希值。

## CSS

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
