/**
 * 去除字符串中出现次数最少的字符，不改变原字符串的顺序
 * 
 * @example
 * ababac => ababa
 * aaabbbcceeff => aaabbb
 */
function fn(str) {
    let map = {}
    for (const char of str) {
        map[char] = (map[char] || 0) + 1
    }

    const entries = Object.entries(map)
    const min = entries.reduce((x, y) => x[1] < y[1] ? x[1] : y[1])
    const minChars = entries.reduce((r, [c, n]) => n === min ? r.concat(c) : r, [])

    let res = ''
    for (const char of str) {
        if (!minChars.includes(char)) {
            res += char
        }
    }
    // console.log(map, min, minChars)
    return res
}
console.log(fn('ababac'))
console.log(fn('aaabbbcceeff'))
