const curry = require('../curry')

test('函数柯里化', () => {
    let fn = curry((a, b, c) => {
        return [a, b, c]
    })

    const result = ['a', 'b', 'c']
    expect(fn('a', 'b', 'c')).toEqual(result)
    expect(fn('a', 'b')('c')).toEqual(result)
    expect(fn('a')('b', 'c')).toEqual(result)
    expect(fn('a')('b')('c')).toEqual(result)
})
