const compose = require('../compose')

test('compose test', () => {
    function fn1(x) {
        return x + 1
    }
    function fn2(x) {
        return x + 2
    }
    function fn3(x) {
        return x + 3
    }
    function fn4(x) {
        return x + 4
    }

    const c1 = compose(fn1, fn2, fn3, fn4)
    expect(c1(1)).toBe(11)

    const c2 = compose(fn2)
    expect(c2).toBe(fn2)
    expect(c2(1)).toBe(3)

    const c3 = compose()
    expect(c3(1)).toBe(1)
})
