/**
 * 二进制转十进制
 *
 * @param {number|string} num 二进制数值
 */
function binToDec(num) {
    const [_int, _fraction] = String(num).split('.')
    const int = _int.split('').reduce((acc, x, i, arr) => {
        return acc + Number(x) * 2 ** (arr.length - 1 - i)
    }, 0)
    const fraction = _fraction
        ? _fraction.split('').reduce((acc, x, i) => {
              return acc + Number(x) * 2 ** -(i + 1)
          }, 0)
        : 0
    return int + fraction
}

/**
 * 十进制转二进制
 * 
 * @param {number} num 十进制数值
 */
function decToBin(num) {
    function intToBin(num) {
        const result = []
        while (num / 2) {
            result.unshift(num % 2)
            num = Math.floor(num / 2)
        }
        return result
    }
    
    function fractionToBin(num) {
        const result = []
        let i = 0
        while (num !== 0 && i++ < 55) {
            num = num * 2
            let bit = num >= 1 ? 1 : 0
            num = num % 1
            result.push(bit)
        }
        return result
    }

    const [int, fraction] = String(num)
        .split(/(?=\.)/)
        .map((x, i) => i === 0 ? intToBin(x) : fractionToBin(x))
        .map(x => x.join(''))
    return `${int || 0}${fraction ? '.' + fraction : ''}`
}

function test(dec) {
    let bin = decToBin(dec)
    let _dec = binToDec(bin)
    console.log(dec, bin, _dec)
}
test(0.1)
test(3)
test(13.5)

module.exports = {
    binToDec,
    decToBin
}
