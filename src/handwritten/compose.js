function compose(...fn) {
    if (fn.length === 0) return (arg) => arg
    return fn.reduce((cur, next) => {
        return (...args) => next( cur(...args) )
    })
}

module.exports = compose
