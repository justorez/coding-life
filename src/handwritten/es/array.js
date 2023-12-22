/**
 * 概念补充：高阶函数
 * 高阶函数是对其他函数进行操作的函数，可以将它们作为参数或返回它们；
 * 简单来说，高阶函数是一个函数，它接收函数作为参数或将函数作为输出返回
 */

/**
 * 注意：map、forEach 这些方法是不可枚举的，
 * 即 for...in 循环是拿不到的，所以如果写 polyfill 的话，
 * 不要覆盖 Array.prototype，而是用 Reflect.defineProperty 设置不可枚举
 */

const arr = [
    /a/,
    /a/,
    /b/,
    '1',
    '1',
    '2',
    1,
    1,
    2,
    NaN,
    NaN,
    null,
    null,
    undefined,
    undefined,
    new Date('2023/3/6'),
    new Date('2023/3/6'),
    { a: 1 },
    { a: 1 }
]

/**
 * 数组去重：RegExp、object、Date 无效
 *
 * @returns new array
 * @see https://github.com/mqyqingfeng/Blog/issues/27
 */
Array.prototype.unique = function () {
    return [...new Set(this)]
}
// 和方法一完全一致
Array.prototype.unique2 = function () {
    const seen = new Map()
    return this.filter((item) => !seen.has(a) && seen.set(item, 1))
}
// RegExp、object、Date 无效，NaN 被全部移除
Array.prototype.unique3 = function () {
    return this.filter((item, index, array) => array.indexOf(item) === index)
}
// 均可去重
Array.prototype.unique4 = function () {
    var obj = {}
    return this.filter((item) => {
        const key =
            Object.prototype.toString.call(item) +
            (item instanceof RegExp ? item.toString() : JSON.stringify(item))
        return obj.hasOwnProperty(key) ? false : (obj[key] = true)
    })
}

Array.prototype._forEach = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    const array = this
    for (let i = 0; i < array.length; i++) {
        callback.call(thisArg, array[i], i, array)
    }
}

/**
 * 该实现没有兼容稀疏数组，详情查看链接
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E7%A8%80%E7%96%8F%E6%95%B0%E7%BB%84
 */
Array.prototype._map = function (callback, thisArg) {
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

Array.prototype._filter = function (callback, thisArg) {
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

Array.prototype._some = function (callback, thisArg) {
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

Array.prototype._flat = function (depth = 1) {
    if (!Number(depth) || Number(depth) < 0) {
        return this
    }
    let arr = this.filter((x) => x) // 过滤掉数组空位
    while (depth > 0) {
        if (arr.some((x) => Array.isArray(x))) {
            arr = [].concat(...arr) // 数组中还有数组元素的话并且 depth > 0，继续展开一层数组
        } else {
            break // 数组中没有数组元素，不管 depth 是否依旧大于 0，停止循环。
        }
        depth--
    }
    return arr
}

// 先 map 后 flat
Array.prototype._flatMap = function (callback, thisArg) {
    // const flat = (array) => array.reduce((pre, cur) => pre.concat(cur), [])
    return this._map(callback, thisArg)._flat()
}

/**
 * 从数组中随机取一个元素
 * Math.random() 的随机范围 [0, 1)
 */
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}
