/**
 * 统计字符串中出现次数最多的字符及次数
 *
 * @param {*} str
 * @example
 * ```js
 * //=> ['a', 6]
 * getFrequentChar("aaabbaaacc");
 *
 * //=> ['a', 3]
 * getFrequentChar("aaa");
 * ```
 */
function getFrequentChar(str) {
    let dict = {}
    let max = ['', 0]
    for (const char of str) {
        dict[char] = (dict[char] || 0) + 1
        if (dict[char] > max[1]) {
            max = [char, dict[char]]
        }
    }
    return max
}

console.log(getFrequentChar('aaabbaaacc'))
console.log(getFrequentChar('aaa'))
