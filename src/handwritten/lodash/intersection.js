/**
 * 数组取交集
 * 
 * @param  {...number[]} arrays
 * @example
 * ```js
 * intersection([2, 1], [2, 3])
 * // => [2]
 * 
 * intersection([1, 2, 2], [1, 2, 2])
 * // => [1, 2]
 * 
 * intersection([1, 2, 2], [1, 2, 2], [1, 2])
 * // => [1, 2]
 * ```
 */
function intersection(...arrays) {
    const result = arrays.reduce((x, y) => x.filter((i) => y.includes(i)))
    return [...new Set(result)]
}

module.exports = {
    intersection
}
