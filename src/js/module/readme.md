CommonJS 和 ESM 的区别
1. CommonJS 模块输出的是一个值的拷贝，ESM 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ESM 模块是编译时输出接口。
3. CommonJS 模块的 `require()` 是同步加载模块，ESM 模块的 `import` 命令是异步加载，有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。

怎么理解 ESM 加载是异步的？

参考这个回答：[Is the loading of ESModule asynchronous?](https://stackoverflow.com/questions/77115924/is-the-loading-of-esmodule-asynchronous)
