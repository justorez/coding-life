/**
 * 数组去重
 * @param {array} arr
 * @returns new array
 * @link https://github.com/mqyqingfeng/Blog/issues/27
 */
function unique(arr) {
    return [...new Set(arr)]
}
function unique2(arr) {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}
function unique3(arr) {
    return arr.filter((item, index, array) => array.indexOf(item) === index)
}
function unique4(array) {
    var obj = {}
    return array.filter((item) => {
        const key = typeof item + JSON.stringify(item)
        return obj.hasOwnProperty(key) ? false : (obj[key] = true)
    })
}

/**
 * 数组扁平化
 * @param {array} arr
 * @returns new array
 */
function flatten(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        result = Array.isArray(arr[i])
            ? result.concat(flatten(arr[i]))
            : result.concat(arr[i])
    }
    return result
}
function flatten2(arr) {
    while (arr.some((x) => Array.isArray(x))) {
        arr = [].concat(...arr)
    }
    return arr
}

/**
 * 注意：map、forEach 这些方法是不可枚举的，
 * 即 for...in 循环是拿不到的，所以如果写 polyfill 的话，
 * 不要覆盖 Array.prototype，而是用 Reflect.defineProperty 设置不可枚举
 */

Array.prototype.fakeForEach = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    const array = this
    for (let i = 0; i < array.length; i++) {
        callback.call(thisArg, array[i], i, array)
    }
}

Array.prototype.fakeMap = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    let res = []
    const array = this
    for (let i = 0; i < array.length; i++) {
        res[i] = callback.call(thisArg, array[i], i, array)
    }
    return res
}

Array.prototype.fakeFilter = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    let res = []
    const array = this
    for (let i = 0; i < array.length; i++) {
        if (callback.call(thisArg, array[i], i, array)) {
            res.push(array[i])
        }
    }
    return res
}

Array.prototype.fakeSome = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    const array = this
    for (let i = 0; i < array.length; i++) {
        if (callback.call(thisArg, array[i], i, array)) {
            return true
        }
    }
    return false
}

Array.prototype.fakeReduce = function (callback, initialValue) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }

    const O = Object(this)
    const len = O.length >>> 0 // 无符号右移 0 位：保证转换后的值为正整数
    let index = 0 // 游标
    let acc // 累加器

    if (arguments.length > 1) {
        acc = initialValue
    } else {
        // 如果没有提供 initialValue，
        // 那么 accumulator 取数组中的第一个值，
        // currentValue 取数组中的第二个值。
        while (index < len && !(index in O)) {
            index++
        }

        // if len is 0 and iniitalValue is not present
        if (index >= len) {
            throw new TypeError('Reduce of empty array with no initial value')
        }
        acc = O[index++]
    }

    while (index < len) {
        if (index in O) {
            acc = callback(acc, O[index], index, O)
        }
        index++
    }

    return acc
}

// 使用 Infinity，可展开任意深度的嵌套数组
Array.prototype.fakeFlat = function (depth = 1) {
    if (!Number(depth) || Number(depth) <= 0) {
        return this
    }
    let arr = this.concat()
    return arr.reduce((pre, cur) => {
        // reduce 会跳过空位
        return pre.concat(Array.isArray(cur) ? cur.fakeFlat(depth - 1) : cur)
    }, [])
}
Array.prototype.fakeFlat2 = function (depth = 1) {
    if (!Number(depth) || Number(depth) < 0) {
        return this
    }
    let arr = this.filter((x) => x) // 获得调用 fakeFlat 函数的数组，顺便跳过空位
    while (depth > 0) {
        if (arr.some((x) => Array.isArray(x))) {
            // arr = [].concat.apply([], arr) // 数组中还有数组元素的话并且 depth > 0，继续展开一层数组
            arr = [].concat(...arr)
        } else {
            break // 数组中没有数组元素并且不管 depth 是否依旧大于 0，停止循环。
        }
        depth--
    }
    return arr
}

module.exports = {
    unique,
    flatten
}
