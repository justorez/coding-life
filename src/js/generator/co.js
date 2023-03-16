const slice = Array.prototype.slice
const toString = Object.prototype.toString

if(typeof module === 'object') {
    module.exports = co
}

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */
function co(gen) {
    const ctx = this
    const args = slice.call(arguments, 1)

    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function') gen = gen.apply(ctx, args)
        if (!gen || typeof gen.next !== 'function') return resolve(gen)

        onFulfilled()

        function onFulfilled(res) {
            let ret
            try {
                ret = gen.next(res)
            } catch (e) {
                return reject(e)
            }
            next(ret)
            return null
        }

        function onRejected(err) {
            let ret
            try {
                ret = gen.throw(err)
            } catch (e) {
                return reject(e)
            }
            next(ret)
        }

        /**
         * Get the next value in the generator,
         * return a promise.
         *
         * @param {Object} ret
         * @return {Promise}
         * @api private
         */
        function next(ret) {
            if (ret.done) {
                return resolve(ret.value)
            }
            let value = toPromise.call(ctx, ret.value)
            if (isPromise(value)) {
                return value.then(onFulfilled, onRejected)
            }
            return onRejected(
                new TypeError('You may only yield a function, promise, generator, array, or object, '
                    + `but the following object was passed: "${String(ret.value)}"`)
            )
        }
    })
}

co.wrap = function (fn) {
    function createPromise() {
        return co.call(this, fn.apply(this, arguments))
    }

    createPromise.__generatorFunction__ = fn
    return createPromise
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {*} obj
 * @return {Promise}
 * @api private
 */
function toPromise(obj) {
    if (!obj) return obj
    if (isPromise(obj)) return obj
    if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj)
    if ('function' == typeof obj) return thunkToPromise.call(this, obj)
    if (Array.isArray(obj)) return arrayToPromise.call(this, obj)
    if (isObject(obj)) return objectToPromise.call(this, obj)
    return obj
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */
function thunkToPromise(fn) {
    let ctx = this
    return new Promise((resolve, reject) => {
        fn.call(ctx, function (err, res) {
            if (err) return reject(err)
            if (arguments.length > 2) {
                res = slice.call(arguments, 1)
            }
            resolve(res)
        })
    })
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */
function arrayToPromise(obj) {
    return Promise.all(obj.map(toPromise, this))
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */
function objectToPromise(obj) {
    let results = new obj.constructor()
    let keys = Object.keys(obj)
    let promises = []
    for (const key of keys) {
        let promise = toPromise.call(this, obj[key])
        if (promise && isPromise(promise)) defer(promise, key)
        else results[key] = obj[key]
    }

    return Promise.all(promises).then(() => results)

    function defer(promise, key) {
        // predefine the key in the result
        results[key] = undefined
        promises.push(
            promise.then(res => {
                results[key] = res
            })
        )
    }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isPromise(obj) {
    return toString.call(obj) === '[object Promise]'
}

/**
 * Check if `obj` is a generator.
 *
 * @param {*} obj
 * @return {Boolean}
 * @api private
 */
function isGenerator(obj) {
    return toString.call(obj) === '[object Generator]'
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {*} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
    return toString.call(obj) === '[object GeneratorFunction]'
}

/**
 * Check for plain object.
 * 
 * @param {*} val
 * @return {Boolean}
 * @api private
 */
function isObject(val) {
    return Object === val.constructor
}
