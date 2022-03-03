function fn(nums) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(nums * 2)
        }, 500)
    })
}

// async/await
async function asyncFn() {
    const num1 = await fn(1)
    console.log(num1) // 2
    const num2 = await fn(num1)
    console.log(num2) // 4
    const num3 = await fn(num2)
    return num3
}
function testAsync() {
    const asyncRes = asyncFn()
    console.log(asyncRes) // Promise
    asyncRes.then(console.log) // 8
}

// generator + promise
function* gen() {
    const num1 = yield fn(1)
    console.log(num1) // 2
    const num2 = yield fn(num1)
    console.log(num2) // 4
    const num3 = yield fn(num2)
    return num3
}
function testCo() {
    const coRes = co(gen)
    console.log(coRes) // Promise
    coRes.then(console.log) // 8
}

testCo()
