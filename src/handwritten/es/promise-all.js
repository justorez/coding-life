/**
 * Promise.all
 * @param {Promise[]} promises 
 */
function pAll(promises = []) {
    return new Promise((resolve, reject) => {
        let count = 0
        const len = promises.length
        const values = new Array(len)

        const collect = index => value => {
            values[index] = value
            ++count === len && resolve(values)
        }

        promises.forEach((promise, i) => {
            if (promise instanceof Promise) {
                // 闭包实现 collect 让下面代码更简洁
                promise.then(collect(i), reject)
            } else {
                collect(i)(promise)
            }
        })
    })
}

module.exports = {
    pAll
}
