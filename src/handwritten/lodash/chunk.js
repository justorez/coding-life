/**
 * 每 n 个元素分为一组
 *
 * @param {number} size
 * @example
 * ```js
 * [1,2,3,4,5,6,7].chunk(3)
 * // => [[1,2,3],[4,5,6],[7]]
 * ```
 */
function chunk(array, size = 1) {
    let arr = Array.from(array)
    let res = []
    while (arr.length) {
        res.push(arr.splice(0, size))
    }
    return res
}

module.exports = {
    chunk
}
