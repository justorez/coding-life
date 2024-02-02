const _ = require('../maxBy')

test('lodash.maxBy', () => {
    const objects1 = [{ n: 1 }, { n: 2 }, { n: 2 }]
    const objects2 = [{ n: 1 }, { n: 2 }]

    expect(_.maxBy(objects1, (o) => o.n)).toEqual([{ n: 2 }, { n: 2 }])
    expect(_.maxBy(objects2, 'n')).toEqual([{ n: 2 }])
    expect(_.maxBy([1, { n: 3 }], 'n')).toEqual([{ n: 3 }])
    expect(_.maxBy([1, 2, 3], 'n')).toEqual([])
    expect(_.maxBy([], 'n')).toEqual([])
})
