/**
 * 字符串压缩编码
 * 只出现一次，不编码数字
 * 
 * @param {string} str 
 * @example
 * ```js
 * encode("aaaabbbcc")
 * //=> a4b3c2
 * 
 * encode("aaaabbbaaaa")
 * //=> a4b3a4
 * 
 * encode("aabbcc")
 * //=> a2b2c2
 * ```
 */
function encode(str) {
    let s = []
    let i = -1
    let lastChar
    for (const char of str) {
        if (char !== lastChar) {
            lastChar = char
            s[++i] = [char, 1]
        } else {
            s[i][1]++
        }
    }
    return s.map(([k, v]) => v === 1 ? k : k + v).join('')
}

console.log(encode("aaaabbbcc"))
console.log(encode("aaaabbbaaaa"))
console.log(encode("aaaabccd"))
