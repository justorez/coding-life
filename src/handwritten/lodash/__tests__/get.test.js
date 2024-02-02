const _ = require('../get')

test('lodash.get', () => {
    const object = { a: [{ b: { c: 3 } }] }

    expect(_.get(object, 'a[0].b.c')).toBe(3)
    expect(_.get(object, `a[0]["b"]['c']`)).toBe(3)
    expect(_.get(object, 'a[100].b.c', 2333)).toBe(2333)
})
