const { binToDec } = require('./bin-dec')

/**
 * 以下是双精度 64 位浮点数标准
 * 
 * V = (-1)^S * (1 + M) * 2^E
 * 
 * @param {number} num 十进制数值
 * @link https://github.com/mqyqingfeng/Blog/issues/155
 * @link https://www.h-schmidt.net/FloatConverter/IEEE754.html
 */
function decTobinexp(num) {
    let sign, exponent, mantissa
    let [int, fraction='0'] = String(Math.abs(num))
        .split(/(?=\.)/)
        .map((x) => Number(x).toString(2))
    // console.log(int, fraction)
    sign = num > 0 ? '0' : '1'
    if (int === '0') {
        let i = fraction.indexOf(1) + 1
        exponent = (-i + 1023).toString(2) // 1023 = 2**(11-1) -1
        mantissa = fraction.slice(i + 1).padEnd(52, 0)
    } else {
        exponent = (int.length - 1 + 1023).toString(2)
        mantissa = (int.slice(1) + fraction.slice(2)).padEnd(52, 0)
    }
    
    return {
        sign, // 符号位 1bit
        exponent, // 指数位 11bits
        mantissa, // 尾数位 52bits
        bin: sign + exponent + mantissa
    }
}

function binexpToDec(exp, bias = 1023) {
    const s = Number(exp.sign)
    const e = Number('0b' + exp.exponent) - bias
    const m = binToDec('0.' + exp.mantissa)
    // console.log(s, e, m)
    return (-1)**s * (1 + m) * (2**e)
}

exp = decTobinexp(0.1)
num = binexpToDec(exp)
console.log(exp)
console.log(num)
