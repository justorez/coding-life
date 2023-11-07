const _ = require('./namingCase')

describe('naming case', () => {
    test('lodash.camelCase', () => {
        expect(_.camelCase('fooBar')).toEqual('fooBar')
        expect(_.camelCase(' Foo Bar ')).toEqual('fooBar')
        expect(_.camelCase('--foo-bar--')).toEqual('fooBar')
        expect(_.camelCase('__FOO_BAR__')).toEqual('fooBar')
    })

    test('lodash.kebabCase', () => {
        expect(_.kebabCase('foo-bar')).toEqual('foo-bar')
        expect(_.kebabCase('Foo Bar')).toEqual('foo-bar')
        expect(_.kebabCase(' fooBar ')).toEqual('foo-bar')
        expect(_.kebabCase('__FOO_BAR__')).toEqual('foo-bar')
        expect(_.kebabCase(' __FOO_BAR__ ')).toEqual('foo-bar')
    })
})
