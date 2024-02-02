var F = function () {}

Object.prototype.a = function () {
    return 'a'
}

Function.prototype.b = function () {
    return 'b'
}

var f = new F()

console.log(F.a()) // a
console.log(F.b()) // b
console.log(f.a()) // a
f.b() // f.b is not a function
