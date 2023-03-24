/**
 * 每 n 个元素分为一组
 * 
 * @param {number} n
 * @example
 * ```js
 * //=> [[1,2,3],[4,5,6],[7]]
 * [1,2,3,4,5,6,7].chunk(3)
 * ```
 */
function chunk(array, n) {
    let arr = Array.from(array)
    let res = []
    while (arr.length) {
        res.push(arr.splice(0, n))
    }
    return res
}

module.exports = chunk
