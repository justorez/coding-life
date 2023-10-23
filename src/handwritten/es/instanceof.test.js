const instanceOf = require('./instanceof')

describe('instanceof 模拟实现', () => {
    test('instanceOf 基本使用', () => {
        function Parent() { }
        function Child() {
            Parent.call(this)
        }
        Child.prototype = Object.create(Parent.prototype)
        Child.prototype.constructor = Child
        const child = new Child()

        expect(instanceOf(child, Child)).toBe(true)
        expect(instanceOf(child, Parent)).toBe(true)
        expect(instanceOf(child, Object)).toBe(true)
        expect(instanceOf(child, Array)).toBe(false)
        expect(instanceOf(true, Boolean)).toBe(false)
        expect(instanceOf(1, Number)).toBe(false)
    })
})
