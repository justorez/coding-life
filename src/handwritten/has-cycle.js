/**
 * 判断对象是否有循环引用
 * 
 * @param {Object} obj
 */
function hasCycle(obj) {
    function has(o, source = []) {
        source = [...source, o]
        for (const k in o) {
            const item = o[k]
            if (typeof item === 'object' && item !== null) {
                if (source.includes(item) || has(item, source)) return true
            }
        }
        return false
    }
    return has(obj)
}

module.exports = hasCycle
