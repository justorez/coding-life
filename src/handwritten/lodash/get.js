/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
function get(object, path, defaultValue) {
    // a[3].b -> a.3.b -> [a, 3, b]
    // 正则三合一：/\[["']?(\w+)['"]?\]/g
    const paths = !Array.isArray(path) ? path :
    path
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/\["(\w+)"\]/g, '.$1')
        .replace(/\['(\w+)'\]/g, '.$1')
        .split('.')
    let result = object
    for (const p of paths) {
        result = result?.[p]
    }
    return result === undefined ? defaultValue : result
}

module.exports = {
    get
}
