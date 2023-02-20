const isObject = (val) =>  typeof val === "object" && val !== null
const isArray = (val) => Array.isArray(val)
/**
 * 对象扁平化
 */
function flatten(obj) {
    let res = {}
    function dfs(o, prefix = '') {
        if (isArray(o)) {
            o.forEach((x, i) => dfs(x, `${prefix}[${i}]`))

        } else if (isObject(o)) {
            for (const k in o) {
                dfs(o[k], `${prefix}${prefix ? '.' : ''}${k}`)
            }

        } else {
            res[prefix] = o
        }
    }
    dfs(obj)
    return res
}

const obj = {
    a: {
        b: 1,
        c: 2,
        d: { e: 5 }
    },
    b: [1, 3, { a: 2, b: 3 }],
    c: 3,
    d: {
        a: [1, { b: 2 }]
    }
}
console.log(flatten(obj))
