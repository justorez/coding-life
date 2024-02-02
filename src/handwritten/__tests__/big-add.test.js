const add = require('../big-add')

test('大数相加', () => {
    const s1 = add('9007199254740991', '1234567899999999999')
    const s2 = 9007199254740991n + 1234567899999999999n
    expect(s1).toEqual(s2.toString())
})
