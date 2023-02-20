const compose = require('../compose')

test('compose test', () => {
    const fn1 = x => x + 1
    const fn2 = x => x + 2
    const fn3 = x => x + 3
    const fn4 = x => x + 4

    const c1 = compose(fn1, fn2, fn3, fn4)
    expect(c1(1)).toBe(11)

    const c2 = compose(fn2)
    expect(c2).toBe(fn2)
    expect(c2(1)).toBe(3)

    const c3 = compose()
    expect(c3(1)).toBe(1)
})
