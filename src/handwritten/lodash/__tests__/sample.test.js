const _ = require('../sample')

describe('sample/sampleSize', () => {
    test('lodash.sample', () => {
        const array = [1, 2, 3, 4]
        expect(array).toEqual(expect.arrayContaining([_.sample(array)]))
    })

    test('lodash.sampleSize', () => {
        const array = [1, 2, 3, 4]
        expect(_.sampleSize(array, -1)).toEqual([])
        expect(_.sampleSize(array, 3).length).toBe(3)
        expect(array).toEqual(expect.arrayContaining(_.sampleSize(array, 2)))
        expect(array).toEqual(expect.arrayContaining(_.sampleSize(array, 6)))
    })
})
