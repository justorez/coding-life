/**
 * 如果最大的项有多个，则多个都返回
 * @param {Array} array 
 * @param {Function|string} by 
 */
function maxBy(array, by) {
    if (array.length === 0) return []

    const get  = typeof by !== 'function' 
        ? (o) => Reflect.get(o, by)
        : by

    // 先筛除不符合取值规则的元素
    array = array.filter(x => get(Object(x)) !== undefined)
    if (array.length === 0) return []

    return array.slice(1).reduce(
        (res, o) => {
            if (get(o) > get(res[0])) {
                return [o]
            }
            if (get(o) === get(res[0])) {
                return [...res, o]
            }
        },
        [ array[0] ]
    )
}

module.exports = {
    maxBy
}
