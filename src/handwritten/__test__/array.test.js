require('../array')

describe('数组方法模拟实现', () => {
    test('fake forEach', () => {
        const arr = ['a', 'b', 3]
        arr.fakeForEach((item, i, array) => {
            expect(array).toBe(arr)
            expect(item).toBe(arr[i])
        })
    })
    
    test('fake flat', () => {
        const arr1 = [1, 2, , 4, 5],
              arr2 = [1, 2, [3, 4, [5, 6]]],
              arr3 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
        expect(arr1.fakeFlat()).toEqual([1, 2, 4, 5])
        expect(arr2.fakeFlat()).toEqual([1, 2, 3, 4, [5, 6]])
        expect(arr2.fakeFlat(2)).toEqual([1, 2, 3, 4, 5, 6])
        expect(arr3.fakeFlat(Infinity))
            .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        
        expect(arr1.fakeFlat2()).toEqual([1, 2, 4, 5])
        expect(arr2.fakeFlat2()).toEqual([1, 2, 3, 4, [5, 6]])
        expect(arr2.fakeFlat2(2)).toEqual([1, 2, 3, 4, 5, 6])
        expect(arr3.fakeFlat2(Infinity))
            .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
})
