/**
 * 无限累加
 * 
 * 实现 sum 相加，可覆写 `toString` 或 `Symbol.toPrimitive`
 * 
 * @example
 * ```js
 * sum(1)(2)(3)() = 6
 * sum(1,2,3)(4)() = 10
 * sum(1, 2, 3) + sum(4, 5) = 15
 * ```
 */
function sum(...args) {
    const f = (...fArgs) => !fArgs.length ? f.toString() : sum(...args, ...fArgs)
    f.toString = () => args.reduce((cur, next) => cur + next)
    return f
}

console.log(sum(1)(2)(3)())
console.log(sum(1, 2, 3)(4)())
console.log(sum(1, 2, 3) + sum(4, 5))
console.log(sum(10) * sum(5)(5))
