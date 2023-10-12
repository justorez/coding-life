const co = require('./co')

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

describe('generator + promise 异步流程控制', () => {
    test('co function 基本使用', () => {
        const coRes = co(gen)
        const type = Object.prototype.toString.call(coRes)
        expect(type).toContain('Promise')
        return expect(coRes).resolves.toBe(8)
    })
})
