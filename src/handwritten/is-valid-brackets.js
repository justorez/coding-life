/**
 * 判断是否为合法的括号字符串 `{([])}`
 * 
 * @param {string} s 
 */
function isValid(s) {
    const stack = []
    stack.top = () => stack[stack.length - 1]
    for (const ch of s) {
        if (['{','(','['].includes(ch)) stack.push(ch)
        else if (ch === '}' && stack.top() === '{') stack.pop()
        else if (ch === ')' && stack.top() === '(') stack.pop()
        else if (ch === ']' && stack.top() === '[') stack.pop()
        else false
    }
    return stack.length === 0
}

console.log(isValid('()[()]{}')) // true
console.log(isValid('(]')) // false
