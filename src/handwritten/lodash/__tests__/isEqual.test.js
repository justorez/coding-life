const isEqual = require('../isEqual')

describe('lodash.isEqual', () => {
    test('基本使用', () => {
        expect(isEqual(0, 0)).toBe(true)
        expect(isEqual(0, -0)).toBe(false)
        expect(isEqual(NaN, NaN)).toBe(true)
        expect(isEqual(Number(NaN), Number(NaN))).toBe(true)
        expect(isEqual('Test', new String('Test'))).toBe(true)
        expect(isEqual([1, 2], [1, 2])).toBe(true)
        expect(isEqual({ value: 1 }, { value: 1 })).toBe(true)
    })

    test('循环引用', () => {
        let a = { foo: { b: { foo: { c: { foo: null } } } } }
        let b = { foo: { b: { foo: { c: { foo: null } } } } }
        a.foo.b.foo.c.foo = a
        b.foo.b.foo.c.foo = b

        expect(isEqual(a, b)).toBe(true)
    })
})
