/**
 * 实现 `String.prototype.toLowerCase`
 * 
 * @param {string} str 
 */
function lowerCase(str) {
    let result = ''
    for (let char of str) {
        const code = char.charCodeAt()
        if (code <= 'Z'.charCodeAt() && code >= 'A'.charCodeAt()) {
            char = String.fromCharCode(code + 32)
        }
        result += char
    }
    return result
}

//=> 'hello!world'
console.log(lowerCase('HELLO!world'))

//=> '零度'
console.log(lowerCase('零度'))
