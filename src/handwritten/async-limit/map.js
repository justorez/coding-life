const sleep = require('../../js/sleep')

/**
 * 实现一个 `promise.map`，进行并发数控制
 * 
 * @param {Array} array
 * @param {Function} mapper
 * @param {Number} concurrency
 * @example
 * ```js
 * Promise.map([1, 2, 3, 4, 5], (x) => Promise.resolve(x + 1));
 * Promise.map([Promise.resolve(1), Promise.resolve(2)], (x) => x + 1);
 * // 注意输出时间控制
 * Promise.map([1, 1, 1, 1, 1, 1, 1, 1], (x) => sleep(1000), { concurrency: 2 });
 * ```
 */
Promise.map = function (array, mapper, concurrency = Infinity) {
    array = Array.from(array)
    return new Promise((resolve, reject) => {
        let currentIndex = 0
        let resolveCount = 0
        let len = array.length
        let result = []
        function next() {
            const index = currentIndex
            currentIndex++
            Promise.resolve(array[index])
                .then((o) => mapper(o, index))
                .then((o) => {
                    result[index] = o
                    resolveCount++
                    // console.log(index, resolveCount, result)
                    if (resolveCount === len) resolve(result)
                    if (currentIndex < len) next()
                })
                .catch(reject)
        }
        for (let i = 0; i < concurrency && i < len; i++) {
            next()
        }
    })
}

async function test() {
    const mapper = (x) => sleep(1000).then(() => x * 2)
    let res = await Promise.map([1, 2, 3, 4, 5], mapper, 2)
    console.log(res)
}
test()
