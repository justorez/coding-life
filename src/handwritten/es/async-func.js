/**
 * 简单实现 async/await
 *
 * @param {GeneratorFunction} generatorFn
 * @example
 * ```js
 * const testAsync = asyncToGenerator(test)
 * testAsync().then(val => {})
 * ```
 */
function asyncToGenerator(generatorFn) {
    return function (...args) {
        const gen = generatorFn.apply(this, args)

        return new Promise((resolve, reject) => {
            function step(key, arg) {
                let result
                try {
                    result = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }

                const { value, done } = result

                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(
                        (val) => step('next', val),
                        (err) => step('throw', err)
                    )
                }
            }
            step('next')
        })
    }
}

const getData = () =>
    new Promise((resolve) => setTimeout(() => resolve(Date.now()), 1000))

/**
 * async 函数会被编译成 generator 函数 (babel 会编译成更本质的形态，这里我们直接用 generator)
 *
 * @example
 * ```js
 * async function test() {
 *     const data = await getData()
 *     console.log('data: ', data)
 *     const data2 = await getData()
 *     console.log('data2: ', data2)
 *     return 'success'
 * }
 * ```
 */
function* testG() {
    // await 被编译成了 yield
    const data = yield getData()
    console.log('data: ', data)
    const data2 = yield getData()
    console.log('data2: ', data2)
    return 'success'
}

const testGAsync = asyncToGenerator(testG)
testGAsync().then(console.log)
