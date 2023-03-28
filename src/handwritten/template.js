/**
 * 版本一：简易字符串模板渲染
 * 
 * ```js
 * let template = '我是{{name}}，年龄{{age}}，性别{{sex}}'
 * ```
 */
// function render(template, data) {
//     // 注意：
//     // 如果正则表达式设置了全局标志，reg.test 的执行会改变正则表达式 lastIndex 属性。
//     // 连续的执行 reg.test，后续的执行将会从 lastIndex 处开始匹配字符串
//     const reg = /\{\{(\w+)\}\}/g
//     const groups = [ ...template.matchAll(reg) ]
//     if (groups.length <= 0) {
//         return template
//     }
//     for (const group of groups) {
//         const value = data[ group[1] ] || ''
//         template = template.replace(group[0], value)
//     }
//     return template
// }

/**
 * 版本二：支持深层取值
 * 
 * @param {string} template 模板字符串
 * @param {Object} data 数据对象
 * @example
 * ```js
 * let template = `我是{{ user['name'] }}，年龄{{user.age}}，性别{{user["sex"]}}`
 * ```
 */
function render(template, data) {
    function get(object, path, defaultValue = '') {
        const paths = path
            .replace(/\[(\w+)\]/g, '.$1')
            .replace(/\["(\w+)"\]/g, '.$1')
            .replace(/\['(\w+)'\]/g, '.$1')
            .split('.')
        let result = object
        for (const p of paths) {
            result = result?.[p]
        }
        return result === undefined ? defaultValue : result
    }
    return template.replace(/{{\s*(['"\[\]\.\w\d]+)\s*}}/g, (_, path) => get(data, path))
}

let template = `{{title}}! 我是{{ user['name'] }}，年龄{{user.age}}，性别{{user.sex[0]}}.`
let data = {
    title: 'Hello',
    user: {
        name: '小明',
        age: 12,
        sex: ['♂', '♀']
    }
}
console.log(render(template, data))
