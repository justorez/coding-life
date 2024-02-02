const _ = require('../omit')

test('lodash.omit', () => {
    const object = { a: 3, b: 4, c: 5 }
    expect(_.omit(object, ["a", "b"])).toEqual({ c: 5 })
    expect(_.omitBy(object, v => v === 3)).toEqual({ b: 4, c: 5 })
})
