/**
 * 随机生成六位数的手机验证码：允许有重复数字
 *
 * @param {number} n
 */
function randomCode(n = 6) {
    const random = (n) => Math.round(Math.random() * n) // [0, n] 随机数
    return new Array(n)
        .fill(0)
        .map(() => random(9))
        .join('')
}

/**
 * 随机生成六位数的手机验证码：没有重复数字
 *
 * @param {number} n
 */
function randomUniqueCode(n = 6) {
    return shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, n).join('')
}
/**
 * @param {number[]} arr
 */
function shuffle(arr) {
    let lastIndex = arr.length
    while (lastIndex--) {
        const i = Math.floor(Math.random() * lastIndex) // [0, lastIndex) 随机数
        ;[arr[i], arr[lastIndex]] = [arr[lastIndex], arr[i]]
    }
    return arr
}

for (let i = 0; i < 20; i++) {
    console.log(randomCode(), randomUniqueCode())
}
