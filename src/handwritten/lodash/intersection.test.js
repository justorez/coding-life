const _ = require('./intersection')

test('lodash.intersection', () => {
    expect(_.intersection([2, 1], [2, 3])).toEqual([2])
    expect(_.intersection([1, 2, 2], [1, 2, 2])).toEqual([1, 2])
    expect(_.intersection([1, 2, 2], [1, 2, 2], [1, 2])).toEqual([1, 2])
})
