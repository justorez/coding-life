function sleep(delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

/**
 * @param {Function} func 
 * @param {number} ms 
 * @param  {...any} args 
 */
function delay(func, ms, ...args) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Promise.resolve(func(...args))
                .then(resolve)
                .catch(reject)
        }, ms)
    })
}

exports.delay = delay
module.exports = sleep
