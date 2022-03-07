const deepClone = require('../../src/js/deep-clone')

describe('深拷贝', () => {
    test('deepClone 基本使用', () => {
        expect(deepClone(123)).toBe(123)
        expect(deepClone('abc')).toBe('abc')
    
        let obj = {
            num: 123,
            str: 'abc',
            arr: [1, 2, 3, 'abc', { name: 'array' }],
            now: new Date(),
            reg: /deepclone/ig,
            data: {
                id: '123456',
                value: 'info of deep-clone'
            }
        }
        let newObj = deepClone(obj)
        // console.log(newObj)
        expect(newObj).not.toBe(obj)
        expect(newObj).toEqual(obj)
    })
})
