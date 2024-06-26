// node --expose-gc
const MB = 1024 * 1024

global.gc()
console.log(process.memoryUsage().heapUsed / MB) // 大约 1.7M

const map = new Map()
let key = new Array(5 * 1024 * 1024)
map.set(key, new Array(5 * 1024 * 1024))

global.gc()
console.log(process.memoryUsage().heapUsed / MB) // 大约 41.9M

// 如果想回收掉 Array(5 * 1024 * 1024)，必须：
// map.delete(key)
key = null

global.gc()
console.log(process.memoryUsage().heapUsed / MB) // 大约 41.9M
