function* test() {
    let a = 1 + 2
    yield 2
    yield 3
}

// 上述代码经过 babel 编译后
function _test() {
    let a
    return generator(function (context) {
        for (;;) {
            switch ((context.prev = context.next)) {
                case 0:
                    a = 1 + 2
                    context.next = 4
                    return 2
                case 4:
                    context.next = 6
                    return 3
                case 6:
                case 'end':
                    return context.stop()
            }
        }
    })
}

/**
 * 简单实现上述中的 generator
 * @param {Function} cb 回调函数
 */
function generator(cb) {
    return (function () {
        let obj = {
            next: 0,
            stop: function () {}
        }

        return {
            next: function () {
                let ret = cb(obj)
                if (ret === undefined) {
                    return {
                        value: undefined,
                        done: true
                    }
                }

                return {
                    value: ret,
                    done: false
                }
            }
        }
    })()
}

// 测试
let g = _test()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log()

function* test2() {
    let x = yield 1
    return x
}
let g2 = test2()
let ret = g2.next()
console.log(ret)
console.log(g2.next(ret.value + 100)) // { value:101, done:true }
console.log(g2.next())
