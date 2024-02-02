const _ = require('../set')

test('lodash.set', () => {
    const object = { a: [{ b: { c: 3 } }] }

    _.set(object, 'a[0].b.c', 4)
    expect(object.a[0].b.c).toBe(4)

    _.set(object, ['x', '0', 'y', 'z'], 5)
    expect(object.x[0].y.z).toBe(5)
    expect(object.x).toEqual([{ y: { z: 5 } }])
})
