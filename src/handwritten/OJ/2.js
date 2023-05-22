/**
 * 数字转汉字，输入为不超过10000亿的数字
 * 
 * @param {number} num 
 */
function trans(num) {
    const name = '零一二三四五六七八九十'.split('')
    const unit = '亿万千百十'.split('')
    const times = [100000000, 10000, 1000, 100, 10]

    const mod = (n, i = 0) => {
        while (i < times.length) {
            const m = times[i]
            if (n >= m) {
                const a = Math.floor(n / m)
                const b = n % m
                const suffix =
                    i + 1 < times.length && (10 * b) / times[i] < 1
                        ? name[0]
                        : ''
                // 按当前位切分成除数和余数，然后计算后一位是否存在（补零）
                return mod(a, i) + unit[i] + suffix + mod(b, i++)
            }
            i++
        }
        return name[n]
    }

    return mod(num).replace(/^一十/, '十')
}

console.log(123456, trans(123456))
// console.log(100010001, trans(100010001))
