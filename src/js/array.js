/**
 * 数组去重
 * @param {array} arr 
 * @returns new array
 */
function unique(arr) {
    return arr.filter((item, index, array) => array.indexOf(item) === index)
}
function unique2(arr) {
    return [ ...new Set(arr) ]
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
    while(arr.some(x => Array.isArray(x))) {
        arr = [].concat(...arr)
    }
    return arr
}

Array.prototype.fakeForEach = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    const array = this
    for (let i = 0; i < array.length; i++) {
        callback.call(thisArg, array[i], i, array)
    }
}

Array.prototype.fakeMap = function(callback, thisArg) {
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

Array.prototype.fakeFilter = function(callback, thisArg) {
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

Array.prototype.fakeSome = function(callback, thisArg) {
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

Array.prototype.fakeReduce = function(callback, initialValue) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }

    const O = Object(this)
    const len = O.length >>> 0 // 无符号右移 0 位：保证转换后的值为正整数
    let k = 0 // 游标
    let acc   // 累加器
    
    if (arguments.length > 1) {
        acc = initialValue
    } else {
        // 如果没有提供 initialValue，
        // 那么 accumulator 取数组中的第一个值，
        // currentValue 取数组中的第二个值。
        while (k < len && !(k in O)) {
            k++
        }

        // if len is 0 and iniitalValue is not present
        if (k >= len) {
            throw new TypeError( 'Reduce of empty array with no initial value' );
        }
        acc = O[k++]
    }

    while (k < len) {
        if (k in O) {
            acc = callback(acc, O[k], k, O)
        }
        k++
    }

    return acc
}

/**
 * 注意：map、forEach 这些方法是不可枚举的，
 * 即 for...in 循环是拿不到的，所以如果写 polyfill 的话，
 * 不要覆盖 Array.prototype，而是用 Object.defineProperty
 */

module.exports = {
    unique,
    flatten
}
