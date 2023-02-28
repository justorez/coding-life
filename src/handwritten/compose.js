// function compose(...args) {
//     if (args.length === 0) return (arg) => arg
//     if (args.length === 1) return args[0]
//     const size = args.length - 1
//     return function () {
//         let i = 0
//         let result = args[i].apply(this, arguments)
//         while (i++ < size) result = args[i].call(this, result)
//         return result
//     }
// }

/**
 * 如果实现从右到左执行，可使用 `reduceRight` 或 `fns.reverse`
 * @param  {...Function} fns 
 */
function compose(...fns) {
    if (fns.length === 0) return (arg) => arg
    if (fns.length === 1) return fns[0]
    return function (arg) {
        return fns.reduce((val, f) => f.call(this, val), arg)
    }
}


module.exports = compose
