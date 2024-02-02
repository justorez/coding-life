require('./call')

describe('call/apply 模拟实现', () => {
    test('call test', () => {
        let foo = {
            value: 1
        }

        function bar() {
            return this.value
        }

        expect(bar._call(foo)).toBe(1)
        expect(bar._call('xxx')).toBeUndefined()
        expect(bar._call(null)).toBeUndefined()
    })

    test('call on primitive', () => {
        function bar() {
            return this
        }

        expect(bar._call(1).valueOf()).toBe(1)
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

        let b1 = bar._apply(null)
        let b2 = bar._apply(obj, ['justorez', 18])

        expect(b1.value).toBeUndefined()
        expect(b2.value).toBe(1)
        expect(b2.name).toBe('justorez')
        expect(b2.age).toBe(18)
    })
})
