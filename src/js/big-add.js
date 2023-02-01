/**
 * 大数加法
 * @param {string} x 
 * @param {string} y 
 */
function bigAdd(x, y) {
    if (x === '') return x
    if (y === '') return y

    let res = '',
        i = x.length - 1,
        j = y.length - 1,
        carry = 0 // 进位
    while (i >= 0 || j >= 0) {
        let n = i >= 0 ? parseInt(x[i--]) : 0 // 越界补0
        let m = j >= 0 ? parseInt(y[j--]) : 0
        let val = n + m + carry
        // carry = val >= 10 ? 1 : 0
        carry = ~~(val / 10) // 两次按位取反：取整数部分
        res = val % 10 + res
    }

    return carry ? '1' + res : res
}

const s1 = bigAdd('9007199254740991', '1234567899999999999')
const s2 = 9007199254740991n + 1234567899999999999n

console.log(s1)
console.log(s2)
console.log(s1 === s2.toString())
