/**
 * 判断对象是否有循环引用
 * @param {Object} obj
 */
function isCircular(obj) {
    function is(o, source = []) {
        source = [...source, o]
        for (const k in o) {
            const item = o[k]
            if (typeof item === 'object' && item !== null) {
                if (source.includes(item) || is(item, source)) return true
            }
        }
        return false
    }
    return is(obj)
}

module.exports = isCircular
