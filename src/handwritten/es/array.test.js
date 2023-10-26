require('./array')

describe('数组方法模拟实现', () => {
    test('_forEach', () => {
        const arr = ['a', 'b', 3]
        arr._forEach((item, i, array) => {
            expect(array).toBe(arr)
            expect(item).toBe(arr[i])
        })
    })
    
    test('_flat', () => {
        const arr1 = [1, 2, , 4, 5],
              arr2 = [1, 2, [3, 4, [5, 6]]],
              arr3 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
        expect(arr1._flat()).toEqual([1, 2, 4, 5])
        expect(arr2._flat()).toEqual([1, 2, 3, 4, [5, 6]])
        expect(arr2._flat(2)).toEqual([1, 2, 3, 4, 5, 6])
        expect(arr3._flat(Infinity))
            .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    test('_flatMap', () => {
        const res = [1, 2, [3, 4], 5]._flatMap(x => x + 1)
        expect(res).toEqual([2, 3, '3,41', 6])
    })
})
