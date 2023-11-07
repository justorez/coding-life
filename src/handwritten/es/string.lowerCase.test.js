const lowerCase = require('./string.lowerCase')

test('String.prototype.toLowerCase', () => {
    expect(lowerCase('HELLO!world')).toEqual('hello!world')
    expect(lowerCase('零度')).toEqual('零度')
})
