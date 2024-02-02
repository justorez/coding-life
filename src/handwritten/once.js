/**
 * Run a function exactly one time
 *
 * @param {Function} fn
 * @returns once function
 */
function once(fn) {
    let value
    let called = false
    return function (...args) {
        if (called) return value
        called = true
        return (value = fn.apply(this, args))
    }
}

module.exports = once
