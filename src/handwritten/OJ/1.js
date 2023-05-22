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
        map[char] ??= 0
        map[char]++
    }

    let minChars = [], min = Infinity, kv = Object.entries(map)
    kv.forEach(([c, n]) => {
        if (n <= min) min = n
    })
    kv.forEach(([c, n]) => {
        if (n === min) minChars.push(c)
    })

    let res = ''
    for (const char of str) {
        if (!minChars.includes(char)) {
            res += char
        }
    }
    console.log(map, min, minChars)
    return res
}
console.log(fn('ababac'))
console.log(fn('aaabbbcceeff'))
