/**
 * 横线转驼峰
 * 
 * @param {string} s 
 */
function camelCase(s) {
    return s.replace(/-([a-zA-Z])/g, (_, p) => p.toUpperCase())
}

/**
 * 驼峰转横线
 * 
 * @param {string} s 
 */
function kebabCase(s) {
    s = s.replace(/([A-Z])/g, match => '-' + match.toLowerCase())
    return s[0] === '-' ? s.substring(1) : s
}

console.log(camelCase('get-element-by-id'))
console.log(kebabCase('GetElementById'))
