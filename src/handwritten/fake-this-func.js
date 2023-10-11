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
Function.prototype.fakeCall = function (context, ...args) {
    context = isPrimitive(context) ? Object(context) : (context || globalThis)
    const f = Symbol('f')
    context[f] = this
    const result = context[f](...args)
    Reflect.deleteProperty(context, f)
    return result
}
Function.prototype.fakeApply = function (context, args) {
    context = isPrimitive(context) ? Object(context) : (context || globalThis)
    const f = Symbol('f')
    context[f] = this
    const result = args ? context[f](...args) : context[f]()
    Reflect.deleteProperty(context, f)
    return result
}

/**
 * 如果 bind 得到的函数用作构造函数（new BindFunc），则 bind 不生效
 * @param {*} context
 */
Function.prototype.fakeBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError(
            'Function.prototype.bind called on incompatible target'
        )
    }

    const self = this // 原函数
    const fBound = function (...bindArgs) {
        return self.apply(
            // 当 fBound 作为构造函数时，this 指向实例，此时结果为 true，
            // 将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值。
            this instanceof fBound ? this : context,
            args.concat(bindArgs)
        )
    }

    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    // 不过，如果直接修改 fBound.prototype = this.prototype 会导致：
    // 我们修改 fBound.prototype 时，this.prototype 也会被修改，所以用一个空函数中转
    // let fNOP = function() {}
    // fNOP.prototype = this.prototype
    // fBound.prototype = new fNOP()
    fBound.prototype = Object.create(this.prototype)

    return fBound
}



/**
 * 软绑定：绑定后 this 指向还可以被修改
 */
Function.prototype.softBind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError(
            'Function.prototype.bind called on incompatible target'
        )
    }

    const self = this
    const fBound = function (...bindArgs) {
        return self.apply(
            (!this || (this === globalThis)) ? context : this,
            args.concat(bindArgs)
        )
    }
    fBound.prototype = Object.create(this.prototype)

    return fBound
}
