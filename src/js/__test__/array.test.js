require('../array')

test('fake forEach test', () => {
    const arr = [ 'a', 'b', 3 ]
    arr.fakeForEach((item, i, array) => {
        expect(array).toBe(arr)
        expect(item).toBe(arr[i])
    })
})
