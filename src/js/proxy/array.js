const rawArray = [1, 2, 3]

const proxyArray = new Proxy(rawArray, {
    get(target, p) {
        console.log('[get] key:', p)
        const val = Reflect.get(target, p)
        if (typeof val === 'function') {
            return val.bind(target)
        } else {
            return val
        }
    }
})

console.log(proxyArray[0])
proxyArray.push(0)
console.log(proxyArray)
