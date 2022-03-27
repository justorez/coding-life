console.log((123)['toString'].length + 123) // 124

function fn1() { }
function fn2(name) { }
function fn3(name, age) { }
function fn4(name, age = 20, sex) { }
function fn5(...args) { }
function fn6(name, age, ...args) { }

console.log(fn1.length) // 0
console.log(fn2.length) // 1
console.log(fn3.length) // 2
console.log(fn4.length) // 1
console.log(fn5.length) // 0
console.log(fn6.length) // 2
