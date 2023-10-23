require('./array.reduce')

test('array.reduce', () => {
    expect([, 1, 2, , 3]._reduce((x, y) => x + y)).toBe(6)
    expect([, 1, 2, , 3]._reduce((x, y) => x + y, 10)).toBe(16)
    expect(() => []._reduce(() => {})).toThrow(TypeError)
})
