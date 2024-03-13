/**
 * Vue3 使用 Proxy 实现响应式的好处：
 * 1. 全面拦截：可以拦截包括读取、赋值、删除在内的几乎所有的对象操作。
 * 2. 深度监听：可以方便地实现对嵌套对象属性的自动递归转换为响应式。如下面的例子所示。
 * 3. 性能优化：直接在目标对象上操作，无须遍历每个属性，效率更高，且内存占用较小。
 */

const proxyMap = new WeakMap()

// 数据绑定和监听示例
const watch = (obj, track, trigger) => {
    const existingProxy = proxyMap.get(obj)
    if (existingProxy) {
        return existingProxy
    }
    const proxy = new Proxy(obj, {
        get(target, prop, receiver) {
            // console.log(receiver === proxy) // true
            track(target, prop)
            // 如果传入了 receiver 且 target[prop] 是一个 getter，
            // 那么 receiver 就会作为这个 getter 的 this
            const res = Reflect.get(target, prop)
            return res && typeof res === 'object'
                ? watch(res, track, trigger) // 递归处理深层次对象
                : res
        },
        set(target, prop, value) {
            Reflect.set(target, prop, value)
            trigger(value, prop)
        }
    })
    proxyMap.set(obj, proxy)
    return proxy
}

let data = {
    value: null
}

let obj = { a: 1, b: { c: 2 } }
let p = watch(
    obj,
    (target, prop) => {
        console.log(`Get '${prop}' ${JSON.stringify(target[prop])}`)
    },
    (value, prop) => {
        data.value = value
        console.log(p[prop], data, '\n')
    }
)

p.a = 2
p.c = 1
p.b.c = 1
