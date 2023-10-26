const get = require('./get')

test('lodash.get', () => {
    const object = { a: [{ b: { c: 3 } }] }
    
    expect(get(object, 'a[0].b.c')).toBe(3)
    expect(get(object, `a[0]["b"]['c']`)).toBe(3)
    expect(get(object, 'a[100].b.c', 2333)).toBe(2333)
})
