/**
 * str[index] 和 str.charAt(index) 区别：
 * 1. index 超出范围，str[index] 返回 undefined，str.charAt(index) 返回空字符串
 * 2. str[index] 兼容性 IE8+
 */

String.prototype.trim1 = function () {
    let str = this,
        whitespace =
            ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'
    for (let i = 0, len = str.length; i < len; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i)
            break
        }
    }
    for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1)
            break
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}

String.prototype.trim2 = function () {
    return this.replace(/^\s+|\s+$/g, '')
    // var str = this,
    //     str = str.replace(/^\s\s*/, ''),
    //     re = /\s/,
    //     i = str.length
    // while (re.test(str.charAt(--i)));
    // return str.slice(0, i + 1)
}
