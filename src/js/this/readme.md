`this` 和 作用域链是两套不同的系统。

![](./img/execution-context.webp)

`this` 是和执行上下文绑定的，也就是说每个执行上下文中都有一个 `this`。执行上下文主要分为三种——全局执行上下文、函数执行上下文和 `eval` 执行上下文，所以对应的 `this` 也只有这三种——全局执行上下文中的 `this`、函数中的 `this` 和 `eval` 中的 `this`。

1. 当函数作为对象的方法调用时，函数中的 `this` 就是该对象；
2. 当函数被正常调用时，在严格模式下，`this` 值是 `undefined`，非严格模式下 `this` 指向的是全局对象 `window`；
3. 嵌套函数中的 `this` 不会继承外层函数的 `this` 值；
4. 可通过 `call`、`apply`、`bind` 方法改变函数中 `this` 的指向；
5. 箭头函数没有自己的执行上下文，所以箭头函数的 `this` 就是它外层函数的 `this`。
