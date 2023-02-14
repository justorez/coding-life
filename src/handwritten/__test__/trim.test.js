require('../trim')

describe('trim 模拟实现', () => {
    const testFn = (fn) => {
        let s1 = '   ',
            s2 = ' foo ',
            s3 = '  foo',
            s4 = 'foo  '
        expect(s1[fn]()).toEqual('')
        expect(s2[fn]()).toEqual('foo')
        expect(s3[fn]()).toEqual('foo')
        expect(s4[fn]()).toEqual('foo')
    }

    test('trim 实现1：非正则', () => testFn('trim1'))
    test('trim 实现2：正则', () => testFn('trim2'))
})
