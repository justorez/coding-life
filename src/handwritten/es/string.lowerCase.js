/**
 * 实现 `String.prototype.toLowerCase`
 *
 * @param {string} str
 */
function lowerCase(str) {
    let result = ''
    const ZCode = 'Z'.charCodeAt()
    const ACode = 'A'.charCodeAt()
    for (let char of str) {
        const code = char.charCodeAt()
        if (code <= ZCode && code >= ACode) {
            char = String.fromCharCode(code + 32)
        }
        result += char
    }
    return result
}

module.exports = lowerCase
