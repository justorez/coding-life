let charsetRegExp = /^[\d\.]+$/ // 校验是否为数字
let defaultOption = {
    thousandSeparator: ',', // 千分位分隔符
    decimalSeparator: '.', // 小数分隔符
    decimalDigits: false // 小数位数, false表示不特殊处理
}
function isNumber(target) {
    return Object.prototype.toString.call(target) === '[object Number]'
}

function thousandify(amount, option) {
    let parsedAmount = amount + '' // 数字转字符串
    if (!charsetRegExp.test(parsedAmount)) {
        return amount
    }
    let { decimalSeparator, thousandSeparator, decimalDigits } = {
        ...defaultOption,
        ...option
    }
    // 将小数部分与整数部分分隔开
    let amountParts = parsedAmount.split(decimalSeparator)
    // 整数部分，从末尾开始每三位数前面插入千分位
    let intPartStr = amountParts[0].replace(
        /(?!^)(?=(\d{3})+$)/g,
        thousandSeparator
    )
    // 小数部分
    let decimalStr = amountParts[1] || ''
    // 截取小数位数，不处理精度，仅截取
    if (isNumber(decimalDigits)) {
        decimalStr = decimalStr.substring(0, decimalDigits)
    }
    return !!decimalStr
        ? [intPartStr, decimalStr].join(decimalSeparator)
        : intPartStr
}

// 正则太复杂？用循环实现
function fn(s) {
    let res = '', len = s.length
    for (let i = len - 1; i >= 0; i--) {
        const sep = (len - i - 1) % 3 ? '' : ',';
        res = s[i] + sep + res
    }
    return res.slice(0, -1)
}

console.log(fn('1235182918'))
console.log(thousandify(182918.928, { decimalDigits: 2 }))
