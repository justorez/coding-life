var foo = {},
    F = function () { }
Object.prototype.a = 'a'
Function.prototype.b = 'b'

console.log(foo.a) // a
console.log(foo.b) // undefined

console.log(F.a) // a
console.log(F.b) // b
