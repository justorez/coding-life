require('./bind')

describe('bind 模拟实现', () => {
    test('bind test', () => {
        let foo = {
            value: 1
        }

        function bar(name, age) {
            this.habit = 'shopping'
            this.name = name
            this.age = age
            return this.value
        }
        bar.prototype.friend = 'tom'

        let bindFoo = bar._bind(foo, 'justorez')
        let obj = new bindFoo(18)

        expect(bindFoo()).toBe(1)
        expect(obj.value).toBeUndefined()
        expect(obj.name).toBe('justorez')
        expect(obj.age).toBe(18)
        expect(obj.habit).toBe('shopping')
        expect(obj.friend).toBe('tom')
    })

    test('softBind test', () => {
        function foo() {
            return this.value
        }

        const bindFoo = foo.softBind({value: 'foo'})
        const obj = {
            value: 'obj',
            fn: bindFoo
        }

        expect(bindFoo()).toBe('foo')
        expect(obj.fn()).toBe('obj')
    })
})
