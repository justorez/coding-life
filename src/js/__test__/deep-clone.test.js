const deepClone = require('../deep-clone')

describe('深拷贝', () => {
    test('deepClone 基本使用', () => {
        expect(deepClone(123)).toBe(123)
        expect(deepClone('abc')).toBe('abc')
        
        let loop = {}
        let obj = {
            loop,
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
        loop.obj = obj
        let newObj = deepClone(obj)
        // console.log(newObj)
        expect(newObj.loop.obj).toBe(obj)
        expect(newObj).not.toBe(obj)
        expect(newObj.data).not.toBe(obj.data)
        expect(newObj.reg).not.toBe(obj.reg)
        expect(newObj.now).not.toBe(obj.now)
        expect(newObj).toEqual(obj)
    })
})
