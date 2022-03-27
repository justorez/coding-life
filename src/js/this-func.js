function GlobalObject() {
    try {
        return window
    } catch (error) {
        return global
    }
}

function isObject(val) {
    return val && typeof val === 'object'
}

/**
 * 改变了 this 指向，让新的对象可以执⾏该函数。
 * 那么思路可以变成给新的对象添加⼀个函数，然后在执⾏完以后删除
 * @param {*} context 
 * @returns 
 */
Function.prototype.fakeCall = function (context, ...args) {
    context = isObject(context)  ? context : GlobalObject()
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.fakeApply = function (context, args) {
    context = isObject(context) ? context : GlobalObject()
    context.fn = this

    let result = args
        ? context.fn(...args)
        : context.fn()
    
    delete context.fn
    return result
}

/**
 * 如果 bind 得到的函数用作构造函数（new BindFunc），则 bind 不生效
 * @param {*} context 
 */
Function.prototype.fakeBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Function.prototype.bind called on incompatible ' + target)
    }

    let self = this
    let fBound = function(...bindArgs) {
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
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
