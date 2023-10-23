require('./array.flat')

test('array.flat', () => {
    const arr1 = [1, 2, , 4, 5],
        arr2 = [1, 2, [3, 4, [5, 6]]],
        arr3 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
    expect(arr1._flat()).toEqual([1, 2, 4, 5])
    expect(arr2._flat()).toEqual([1, 2, 3, 4, [5, 6]])
    expect(arr2._flat(2)).toEqual([1, 2, 3, 4, 5, 6])
    expect(arr3._flat(Infinity)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
