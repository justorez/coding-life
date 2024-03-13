const map = new Map()
map.set('k1', 'jack')
map.set('k2', 23)

const proxyMap = new Proxy(map, {
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

console.log(proxyMap.get('k1'))
proxyMap.set('k3', Date.now())
console.log(proxyMap.size)
proxyMap.delete('k2')
console.log(proxyMap.entries())
