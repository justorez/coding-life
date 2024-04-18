const { counter, incCounter, getCounter } = require('./lib.cjs')

console.log(counter) // 3

incCounter()

// commonjs 导出的是值的拷贝
// 一旦输出一个值，模块内部的变化就影响不到这个值
console.log(counter) // 3
console.log(getCounter()) // 4
