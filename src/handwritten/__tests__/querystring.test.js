const qs = require('../querystring')

describe('querystring', () => {
    test('qs.parse', () => {
        const o1 = qs.parse('https://web.dev')
        const o2 = qs.parse('https://web.dev?a')
        const o3 = qs.parse('https://web.dev?name=%E5%B1%B1%E6%9C%88')
        const o4 = qs.parse('https://web.dev?name=%E5%B1%B1%E6%9C%88&a=3')
        const o5 = qs.parse('https://web.dev?name=%E5%B1%B1%E6%9C%88&a=3&a=4')
        const o6 = qs.parse('https://web.dev?name=%E5%B1%B1%E6%9C%88&a=3#hash')
        const o7 = qs.parse('https://web.dev?name=1%2B1%3D2')

        expect(o1).toEqual({})
        expect(o2).toEqual({ a: '' })
        expect(o3).toEqual({ name: '山月' })
        expect(o4).toEqual({ name: '山月', a: '3' })
        expect(o5).toEqual({ name: '山月', a: ['3', '4'] })
        expect(o6).toEqual({ name: '山月', a: '3' })
        expect(o7).toEqual({ name: '1+1=2' })
    })

    test('qs.stringify', () => {
        const s1 = qs.stringify({ a: 3, b: 4 })
        const s2 = qs.stringify({ a: 3, b: null })
        const s3 = qs.stringify({ a: 3, 月: '光' })

        expect(s1).toEqual('a=3&b=4')
        expect(s2).toEqual('a=3&b=')
        expect(s3).toEqual('a=3&%E6%9C%88=%E5%85%89')
    })
})
