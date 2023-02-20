/**
 * 实现 (a == 1 && a == 2 && a == 3) 为 true
 */

function f1() {
    let a = {
        i: 1,
        toString() {
            return this.i++
        }
    }
    console.log(a == 1 && a == 2 && a == 3)
}

function f2() {
    let a = [1, 2, 3]
    a.join = a.shift
    console.log(a == 1 && a == 2 && a == 3)
}

function f3() {
    let val = 1
    Reflect.defineProperty(globalThis, 'a', {
        get() {
            return val++
        }
    })
    console.log(a == 1 && a == 2 && a == 3)
}

f1()
f2()
f3()
