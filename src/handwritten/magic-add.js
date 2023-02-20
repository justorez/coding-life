/**
 * 实现 add 函数满足如下输出
 * add(1)(2)(3)()=6
 * add(1,2,3)(4)()=10
 */

function add(...args) {
    let allArgs = [...args]
    function fn(...fnArgs) {
        if (!fnArgs.length) return fn.toString()
        allArgs = allArgs.concat(fnArgs)
        return fn
    }
    fn.toString = () => allArgs.reduce((cur, next) => cur + next)

    return fn
}

console.log(add(1)(2)(3)())
console.log(add(1, 2, 3)(4)())
