const compose = require('../compose')

describe('函数组合', () => {
    test('函数组合功能测试', () => {
        const fn1 = x => x + 1
        const fn2 = x => x + 2
        const fn3 = x => x + 3
        const fn4 = x => x + 4
    
        const c1 = compose(fn1, fn2, fn3, fn4)
        const c2 = compose(fn2)
        const c3 = compose()
    
        expect(c1(1)).toBe(11)
        expect(c2).toBe(fn2)
        expect(c2(1)).toBe(3)
        expect(c3(1)).toBe(1)
    })

    test('函数组合 this', () => {
        function fn1(v) {
            return v + this.val
        }
        function fn2(v) {
            return v + '.'
        }
    
        const obj = {
            fn: compose(fn1, fn2),
            val: 'Tim'
        }
        expect(obj.fn('Hello! ')).toEqual('Hello! Tim.')
    })
})
