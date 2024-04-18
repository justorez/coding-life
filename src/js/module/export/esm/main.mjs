import lib, { counter, incCounter, getCounter } from './lib.mjs'

console.log(counter, lib.counter) // 3 3

incCounter()

// ESM 导出的是值的引用
// 模块内变量值变化，导出的变量值也随着变化
console.log(counter, lib.counter) // 4 3
console.log(getCounter()) // 4
