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
 * 从右到左执行，`reduceRight` 或 `fns.reverse`。
 * pipe 和 compose 类似，只不过从左往右执行。
 * 
 * @param  {...Function} fns 
 * @link [Pointfree 编程风格指南](https://www.ruanyifeng.com/blog/2017/03/pointfree.html)
 */
function compose(...fns) {
    if (fns.length === 0) return (arg) => arg
    if (fns.length === 1) return fns[0]
    return function (arg) {
        return fns.reduceRight((val, f) => f.call(this, val), arg)
    }
}


module.exports = compose
