const hasCycle = require('../has-cycle')

describe('检测对象是否存在循环引用', () => {
    var x = { name: 'x' }
    var obj = {
        a: {
            c: [1, 2]
        },
        b: 1
    }
    
    test('不存在循环引用', () => {
        expect(hasCycle(obj)).toBe(false)
    })

    test('指向同一个对象并非循环引用', () => {
        const o = { ...obj }
        o.x = x
        o.y = x
        expect(hasCycle(o)).toBe(false)
    })

    test('存在循环引用', () => {
        const o = { ...obj }
        o.a.d = o
        expect(hasCycle(o)).toBe(true)
    })
})
