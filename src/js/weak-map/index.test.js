const JWeakMap = require('./')

describe('My WeakMap', () => {
    test('basic test', () => {
        const map = new JWeakMap()
        const o = { name: 'justorez' }
        map.set(o, 20)

        expect(map.toString()).toBe('[object WeakMap]')
        expect(() => map.set('xxx')).toThrow(TypeError)
        expect(map.has(o)).toBe(true)
        expect(map.has(1)).toBe(false)
        expect(map.get(o)).toBe(20)
        expect(map.delete(1)).toBe(false)
        expect(map.delete(o)).toBe(true)
        expect(map.has(o)).toBe(false)
        expect(map.get(o)).toBeUndefined()
    })

    test('test with initial value', () => {
        const o1 = { name: 'leo' }
        const o2 = { name: 'tom' }
        const map = new JWeakMap([
            [o1, 'good boy'],
            [o2, 'nice guy']
        ])

        expect(map.has(o1)).toBe(true)
        expect(map.has(o2)).toBe(true)
        expect(map.get(o2)).toBe('nice guy')
    })
})
