/**
 * @param {number} delay 
 */
function sleep(delay = 1000) {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * 同步睡眠函数
 * 
 * 注意浏览器环境 SharedArrayBuffer 有使用限制，详见 MDN
 * 
 * @param {number} ms 
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#%E5%AE%89%E5%85%A8%E9%9C%80%E6%B1%82
 */
function sleepSync(ms = 1000) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
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

module.exports = {
    sleep,
    sleepSync,
    delay
}
