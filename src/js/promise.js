/**
 * 实现 Promises/A+ 规范
 * 参考文章：https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g
 */
const { isFunction, isObject, isBrowserEnv, isNodeEnv } = require('./types')

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const microtask = setTimeout
if (isBrowserEnv()) {
    microtask = queueMicrotask
} else if (isNodeEnv()) {
    microtask = process.nextTick
}

class JPromise {
    constructor(fn) {
        this.state = PENDING
        this.result = null
        this.callbacks = []

        let onFulfilled = (value) => transition(this, FULFILLED, value)
        let onRejected = (reason) => transition(this, REJECTED, reason)

        // 保证 resolve/reject 只有一次调用有效
        let ignore = false
        let resolve = (value) => {
            if (ignore) return
            ignore = true
            resolvePromise(this, value, onFulfilled, onRejected)
        }
        let reject = (reason) => {
            if (ignore) return
            ignore = true
            onRejected(reason)
        }

        try {
            fn(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    /**
     * 构造下一个 promise 的 result
     * @param {function} onFulfilled 
     * @param {function} onRejected 
     * @returns next promise
     */
    then(onFulfilled, onRejected) {
        return new JPromise((resolve, reject) => {
            let callback = {
                onFulfilled,
                onRejected,
                resolve,
                reject
            }

            if (this.state === PENDING) {
                this.callbacks.push(callback)
            } else {
                // 直到执行上下文栈只包含平台代码之前，onFulfilled 或 onRejected 不能被调用。
                // 故此处只能用 setTimeout/nextTick 等方法间接模拟实现
                microtask(() => handleCallback(callback, this.state, this.result))
            }
        })
    }

    catch(onRejected) {
        this.then(null, onRejected)
    }

    static resolve(value) {
        return new JPromise(resolve => resolve(value))
    }

    static reject(reason) {
        return new JPromise((_, reject) => reject(reason))
    }

    static deferred() {
        let ret = {}
        ret.promise = new JPromise((resolve, reject) => {
            ret.resolve = resolve
            ret.reject = reject
        })
        return ret
    }
}

/**
 * 在 pending 状态，promise 可以切换到 fulfilled 或 rejected。
 * 
 * 在 fulfilled 状态，不能迁移到其它状态，必须有个不可变的 value。
 * 
 * 在 rejected 状态，不能迁移到其它状态，必须有个不可变的 reason。
 * @param {JPromise} promise 
 * @param {PENDING|FULFILLED|REJECTED} state 
 * @param {*} result fulfilled 下的 value 或 rejected 下的 reason
 * @returns 
 */
function transition(promise, state, result) {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = result
    // 当状态变更时，异步清空所有 callbacks
    microtask(() => handleCallbacks(promise.callbacks, state, result))
}

function resolvePromise(promise, result, resolve, reject) {
    if (result === promise) {
        let reason = new TypeError('Can not fulfill promise with itself')
        reject(reason)
    }

    if (isPromise(result)) {
        return result.then(resolve, reject)
    }

    if (isThenable(result)) {
        try {
            let then = result.then
            return new JPromise(then.bind(result)).then(resolve, reject)
        } catch (error) {
            return reject(error)
        }
    }

    resolve(result)
}

function handleCallback(callback, state, result) {
    let { onFulfilled, onRejected, resolve, reject } = callback
    try {
        if (state === FULFILLED) {
            isFunction(onFulfilled)
                ? resolve(onFulfilled(result))
                : resolve(result)
        } else if (state === REJECTED) {
            isFunction(onRejected)
                ? resolve(onRejected(result))
                : reject(result)
        }
    } catch (error) {
        reject(error)
    }
}

/**
 * @param {callback[]} callbacks 
 * @param {string} state 
 * @param {*} result 
 */
function handleCallbacks(callbacks, state, result) {
    while (callbacks.length) {
        handleCallback(callbacks.shift(), state, result)
    }
}

function isPromise(val) {
    return val instanceof JPromise
}

function isThenable(val) {
    return (isObject(val) || isFunction(val)) && isFunction(val.then)
}

module.exports = JPromise
