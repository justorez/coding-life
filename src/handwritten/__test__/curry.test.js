const curry = require('../curry')

test('函数柯里化', () => {
    const result = ['a', 'b', 'c']
    let fn = curry((a, b, c) => [a, b, c])
    expect(fn('a', 'b', 'c')).toEqual(result)
    expect(fn('a', 'b')('c')).toEqual(result)
    expect(fn('a')('b', 'c')).toEqual(result)
    expect(fn('a')('b')('c')).toEqual(result)

    let add = curry((a, b, c) => a + b + c, 1)
    expect(add(2)(3)).toBe(6)
    expect(add(2, 3)).toBe(6)
})
