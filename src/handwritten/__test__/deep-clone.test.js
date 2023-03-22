const deepClone = require('../deep-clone')

describe('深拷贝', () => {
    test('深拷贝基本类型', () => {
        expect(deepClone(123)).toBe(123)
        expect(deepClone('abc')).toBe('abc')
    })

    test('深拷贝对象类型', () => {
        let obj = {
            loop: {},
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
        obj.loop.obj = obj
        let newObj = deepClone(obj)
        // console.log(newObj)
        expect(newObj.loop.obj).toBe(newObj)
        expect(newObj.loop.obj).not.toBe(obj)
        expect(newObj).not.toBe(obj)
        expect(newObj.data).not.toBe(obj.data)
        expect(newObj.now).not.toBe(obj.now)
        expect(newObj.reg).not.toBe(obj.reg)
        expect(newObj).toEqual(obj)
    })
})
