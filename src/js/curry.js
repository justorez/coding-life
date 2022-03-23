/**
 * 柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。
 */

function subCurry(fn, ...args) {
    return function() {
        return fn.apply(this, args)
    }
}

function curry(fn, length) {
    length = length || fn.length
    return function() {
        if (arguments.length < length) {
            let combined = [fn, ...arguments]
            return curry(subCurry.apply(this, combined), length - arguments.length)
        } else {
            return fn.apply(this, arguments)
        }
    }
}

module.exports = curry
