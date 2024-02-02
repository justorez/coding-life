/**
 * @param {Object} o
 * @param {string[]} keys
 * @example
 * ```js
 * const object = { a: 3, b: 4, c: 5 }
 *
 * //=> { c: 5 }
 * omit(object, ["a", "b"])
 * ```
 */
function omit(o, keys) {
    let result = { ...o }
    keys.forEach((k) => Reflect.deleteProperty(result, k))
    return result
}

/**
 * @param {Object} o
 * @param {Function} is
 * @example
 * ```js
 * //=> { b: 4, c: 5 }
 * omitBy(object, (value) => value === 3)
 * ```
 */
function omitBy(o, is) {
    let result = { ...o }
    Object.entries(result).forEach(([k, v]) => {
        if (is(v)) Reflect.deleteProperty(result, k)
    })
    return result
}

module.exports = {
    omit,
    omitBy
}
