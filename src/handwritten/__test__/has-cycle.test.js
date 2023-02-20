const hasCycle = require('../has-cycle')

test('检测对象是否存在循环引用', () => {
    var x = { name: 'x' }
    var obj = {
        a: {
            c: [1, 2]
        },
        b: 1
    }
    expect(hasCycle(obj)).toBe(false)
    obj.x = x
    obj.y = x
    expect(hasCycle(obj)).toBe(false)
    obj.a.d = obj
    expect(hasCycle(obj)).toBe(true)
})
