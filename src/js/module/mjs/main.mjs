import lib, { counter, incCounter, getCounter } from './lib.mjs'

console.log(counter, lib.counter) // 3 3
incCounter()
console.log(counter, lib.counter) // 4 3
console.log(getCounter()) // 4
