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

/**
 * 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
 * 偏函数（局部应用）则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
 * Curried functions are automatically partially applied.
 *
 * @param {Function} fn
 * @param {...any} args
 */
function curry(fn, ...args) {
    const length = fn.length
    return function (...fnArgs) {
        let allArgs = [...args, ...fnArgs]
        if (allArgs.length < length) {
            return curry.call(this, fn, ...allArgs)
        } else {
            return fn.apply(this, allArgs)
        }
    }
}

module.exports = curry
