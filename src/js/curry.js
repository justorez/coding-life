/**
 * 柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术。
 */

// function subCurry(fn, ...args) {
//     return function(...subArgs) {
//         return fn.apply(this, [...args, ...subArgs])
//     }
// }
// function curry(fn, length) {
//     length = length || fn.length
//     return function(...args) {
//         if (args.length < length) {
//             let combined = [fn, ...args]
//             return curry(subCurry.apply(this, combined), length - arguments.length)
//         } else {
//             return fn.apply(this, args)
//         }
//     }
// }

function curry(fn, ...args) {
    const length = fn.length
    return function (...fnArgs) {
        let _args = [...args, ...fnArgs]
        if (_args.length < length) {
            return curry2.call(this, fn, ..._args)
        } else {
            return fn.apply(this, _args)
        }
    }
}

module.exports = curry
