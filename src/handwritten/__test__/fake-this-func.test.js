require('../fake-this-func')

describe('call、apply、bind 模拟实现', () => {
    test('call test', () => {
        let foo = {
            value: 1
        }

        function bar() {
            return this.value
        }

        expect(bar.fakeCall(foo)).toBe(1)
        expect(bar.fakeCall('xxx')).toBeUndefined()
        expect(bar.fakeCall(null)).toBeUndefined()
    })

    test('apply test', () => {
        let obj = {
            value: 1
        }
        
        function bar(name, age) {
            return {
                value: this.value,
                name: name,
                age: age
            }
        }

        let b1 = bar.apply(null)
        let b2 = bar.apply(obj, ['justorez', 18])

        expect(b1.value).toBeUndefined()
        expect(b2.value).toBe(1)
        expect(b2.name).toBe('justorez')
        expect(b2.age).toBe(18)
    })

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

        let bindFoo = bar.fakeBind(foo, 'justorez')
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
