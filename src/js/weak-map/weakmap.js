// node --expose-gc
const MB = 1024 * 1024

global.gc()
console.log(process.memoryUsage().heapUsed / MB) // 大约 1.7M

const wm = new WeakMap()
let key = new Array(5 * 1024 * 1024)
wm.set(key, 1)

global.gc()
console.log(process.memoryUsage().heapUsed / MB) // 大约 41.9M

key = null
global.gc()
console.log(process.memoryUsage().heapUsed / MB) // 大约 1.9M
