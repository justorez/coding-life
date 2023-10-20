const isPrimitive = v => ['number', 'boolean', 'bigint', 'symbol', 'string'].includes(typeof v)

/**
 * 非严格模式下，null 和 undefined 会被替换为 globalThis，原始值将被转换为对象。
 * 严格模式下，null 和 undefined 保持不变。
 * 很可惜，无法用代码去模拟实现严格模式的特性。
 * 
 * 改变了 this 指向，让新的对象可以执⾏该函数。
 * 那么思路可以变成给新的对象添加⼀个函数，然后在执⾏完以后删除。
 * 如果目标对象不合法，则将 this 指向全局对象。
 * @param {*} context
 * @returns
 */
Function.prototype._call = function (context, ...args) {
    context = isPrimitive(context) ? Object(context) : (context || globalThis)
    const f = Symbol('f')
    context[f] = this
    const result = context[f](...args)
    Reflect.deleteProperty(context, f)
    return result
}

Function.prototype._apply = function (context, args) {
    context = isPrimitive(context) ? Object(context) : (context || globalThis)
    const f = Symbol('f')
    context[f] = this
    const result = args ? context[f](...args) : context[f]()
    Reflect.deleteProperty(context, f)
    return result
}
