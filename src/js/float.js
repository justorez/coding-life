/**
 * 解决 0.1 + 0.2 != 0.3 问题
 */

console.log(0.1 + 0.2, 0.1 + 0.2 === 0.3) // 0.30000000000000004 false

// 方法一：转整数，再转浮点
function add(...nums) {
    const x = Math.pow(10, 15)
    return nums.reduce((pre, cur) => pre + cur * x, 0) / x
}
console.log(add(0.1, 0.2), add(0.1, 0.2) === 0.3)

// 方法二：toFixed
function add2(...nums) {
    return parseFloat(nums.reduce((pre, cur) => pre + cur, 0).toFixed(1))
}
console.log(add2(0.1, 0.2), add2(0.1, 0.2) === 0.3)

// 方法三：仅判断是否相等
function equal(a, b) {
    // Number.EPSILON = Math.pow(2, -52)
    return Math.abs(a - b) < Number.EPSILON
}
console.log(equal(0.1 + 0.2, 0.3))
