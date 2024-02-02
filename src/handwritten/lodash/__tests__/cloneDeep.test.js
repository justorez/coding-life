const cloneDeep = require('../cloneDeep')

describe('深拷贝', () => {
    test('基本类型', () => {
        expect(cloneDeep(123)).toBe(123)
        expect(cloneDeep('abc')).toBe('abc')
    })

    test('对象类型', () => {
        let obj = {
            loop: {},
            num: 123,
            str: 'abc',
            arr: [1, 2, 3, 'abc', { name: 'array' }],
            now: new Date(),
            reg: /cloneDeep/ig,
            data: {
                id: '123456',
                value: 'clone result'
            }
        }
        obj.loop.obj = obj
        let newObj = cloneDeep(obj)
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
