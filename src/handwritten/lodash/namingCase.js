/**
 * 转换字符串为驼峰写法
 * @param {string} str
 */
function camelCase(str) {
    // 这种写法会让 fooBar 变成 foobar
    // return str.toLowerCase()
    //     .replace(/[\-_]/g, ' ').trim()
    //     .replace(/\s+([a-zA-Z])/g, (_, s) => s.toUpperCase())

    return str
        .split(/[-_\s]+/)
        .filter((w) => w !== '')
        .reduce((prev, cur, index) => {
            if (index === 1) prev = prev.toLowerCase()
            cur = cur.charAt(0).toUpperCase() + cur.slice(1).toLowerCase()
            return prev + cur
        })
}

/**
 * 转换字符串为横线写法
 * @param {string} str
 */
function kebabCase(str) {
    return str
        .replace(/[-_\s]([A-Z])/g, '-$1')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/^[\s-_]+|[\s-_]+$/g, '')
        .toLowerCase()
}

module.exports = {
    camelCase,
    kebabCase
}
