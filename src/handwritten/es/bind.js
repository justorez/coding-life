/**
 * 如果 bind 得到的函数用作构造函数（new BindFunc），则 bind 不生效
 * @param {*} context
 */
Function.prototype._bind = function (context, ...args) {
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
Function.prototype.softBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError(
            'Function.prototype.bind called on incompatible target'
        )
    }

    const self = this
    const fBound = function (...bindArgs) {
        return self.apply(
            !this || this === globalThis ? context : this,
            args.concat(bindArgs)
        )
    }
    fBound.prototype = Object.create(this.prototype)

    return fBound
}
