/**
 * @param {number} ms 
 */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms))
}

/**
 * 同步睡眠函数
 * 
 * 注意浏览器环境 `SharedArrayBuffer` 有使用限制，详见 MDN
 * 
 * @param {number} ms 
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#%E5%AE%89%E5%85%A8%E9%9C%80%E6%B1%82
 */
function sleepSync(ms = 1000) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

/**
 * @param {Function} fn 
 * @param {number} ms 
 * @param  {...any} args 
 */
function delay(fn, ms, ...args) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(fn(...args))
            } catch (error) {
                reject(error)
            }
        }, ms)
    })
}

module.exports = {
    sleep,
    sleepSync,
    delay
}
