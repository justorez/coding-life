const _ = require('../lodash')

describe('lodash 相关方法实现', () => {
    test('_.get test', () => {
        const object = { a: [{ b: { c: 3 } }] }
        expect(_.get(object, 'a[0].b.c')).toBe(3)
        expect(_.get(object, 'a[0]["b"]["c"]')).toBe(3)
        expect(_.get(object, 'a[100].b.c', 2333)).toBe(2333)
    })

    test('_.omit test', () => {
        const object = { a: 3, b: 4, c: 5 }
        expect(_.omit(object, ["a", "b"])).toEqual({ c: 5 })
        expect(_.omitBy(object, (value) => value === 3)).toEqual({ b: 4, c: 5 })
    })
})
