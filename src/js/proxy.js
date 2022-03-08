// 数据绑定和监听示例
const watch = (obj, setBind, getLogger) => {
    return new Proxy(obj, {
        get(target, property, receiver) {
            getLogger(target, property)
            return Reflect.get(target, property, receiver)
        },
        set(target, property, value) {
            setBind(value)
            return Reflect.set(target, property, value)
        }
    })
}

let data = {
    value: null
}

let obj = { a: 1 }
let p = watch(obj, (v) => {
    data.value = v
}, (target, property) => {
    console.log(`Get '${property}' = ${target[property]}`)
})

p.a = 2
console.log(p.a, data)
