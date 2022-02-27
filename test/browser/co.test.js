const co = require('../../src/browser/generator/co')

function fn(nums) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(nums * 2)
        }, 50)
    })
}

function* gen() {
    const num1 = yield fn(1)
    const num2 = yield fn(num1)
    const num3 = yield fn(num2)
    return num3
}

test('将生成器函数转换为 promise', () => {
    const coRes = co(gen)
    const type = Object.prototype.toString.call(coRes)
    expect(type).toContain('Promise')
    return expect(coRes).resolves.toBe(8)
})
