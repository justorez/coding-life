function test1() {
    let A = function () { }
    A.prototype.n = 1
    let b = new A()
    A.prototype = {
        n: 2,
        m: 3
    }
    let c = new A()

    console.log(b.n) // 1
    console.log(b.m) // undefined

    console.log(c.n) // 2
    console.log(c.m) // 3
}

function test2() {
    let A = function () { }
    A.prototype.n = 1
    let b = new A()

    let c = b.n
    console.log(c) // 1
    A.prototype.n = 2
    console.log(b.n) // 2
}

test1()
console.log(' ')
test2()
