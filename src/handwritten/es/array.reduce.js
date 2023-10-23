/**
 * @param {Function} callback
 * @param {*} initialValue
 */
Array.prototype._reduce = function (callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function')
    }

    const array = Object(this)
    const len = array.length
    let index = 0
    let accumulator

    if (arguments.length > 1) {
        accumulator = initialValue
    } else {
        // 将原数组转换为普通对象配合 in 操作符来跳过空元素。
        // 取数组第一个非空元素作为 initialValue。
        while (index < len && !(index in array)) {
            index++
        }

        // if len is 0 and initialValue is not present
        if (index >= len) {
            throw new TypeError('Reduce of empty array without initial value')
        }

        accumulator = array[index++]
    }

    while (index < len) {
        if (index in array) {
            accumulator = callback(accumulator, array[index], index, array)
        }
        index++
    }

    return accumulator
}
