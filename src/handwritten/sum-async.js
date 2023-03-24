function add(a, b) {
    // return Promise.resolve(a + b)
    return new Promise((resolve) => setTimeout(() => resolve(a + b), 200))
}

/**
 * 请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用 add 异步方法
 * add 函数已实现，模拟异步请求后端返回一个相加后的值
 */

// 串行
async function sum1(arr) {
    let s = arr[0]
    for (let i = 1; i < arr.length; i++) {
        s = await add(s, arr[i])
    }
    return s
}
// 二分 + 并行 + 并行数控制
function sum2(arr, concurrency = Infinity) {
    if (arr.length === 1) return arr[0]
    // const promises = chunk(arr, 2).map(([a, b]) => b === undefined ? a : add(a, b))
    // return Promise.all(promises).then(res => sum(res))
    return pMap(
        chunk(arr, 2),
        ([a, b]) => (b === undefined ? a : add(a, b)),
        concurrency
    ).then((res) => sum2(res, concurrency))
}

/**
 * @param {any[]} array
 * @param {function} mapper
 * @param {number} concurrency
 */
function pMap(array, mapper, concurrency) {
    return new Promise((resolve) => {
        const len = array.length
        const result = new Array(len)
        let resolved = 0
        let currentIndex = 0
        const next = () => {
            let index = currentIndex
            currentIndex++
            Promise.resolve(array[index])
                .then(mapper)
                .then((val) => {
                    result[index] = val
                    if (++resolved === len) resolve(result)
                    if (currentIndex < len) next()
                })
        }
        for (let i = 0; i < concurrency && i < len; i++) {
            next()
        }
    })
}

function chunk(arr, size) {
    const res = []
    for (let i = 0; i < arr.length; i++) {
        const index = Math.floor(i / size)
        res[index] ??= []
        res[index].push(arr[i])
    }
    return res
}

console.time('sum serial')
sum1([1, 2, 3, 4, 5, 6]).then((res) => {
    console.log('sum serial', res)
    console.timeEnd('sum serial')
})

console.time('sum parallel')
sum2([1, 2, 3, 4, 5, 6]).then((res) => {
    console.log('sum parallel', res)
    console.timeEnd('sum parallel')
})

console.time('sum parallel-2')
sum2([1, 2, 3, 4, 5, 6], 2).then((res) => {
    console.log('sum parallel-2', res)
    console.timeEnd('sum parallel-2')
})
