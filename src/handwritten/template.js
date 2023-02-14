/**
 * 渲染字符串模板
 * @param {string} template 模板字符串
 * @param {Object} data 数据对象
 */
function render(template, data) {
    // 注意：
    // 如果正则表达式设置了全局标志，test() 的执行会改变正则表达式 lastIndex 属性。
    // 连续的执行 test()，后续的执行将会从 lastIndex 处开始匹配字符串
    const reg = /\{\{(\w+)\}\}/g
    const groups = [ ...template.matchAll(reg) ]
    if (groups.length <= 0) {
        return template
    }
    for (const group of groups) {
        const value = data[ group[1] ] || ''
        template = template.replace(group[0], value)
    }
    return template
}

function test() {
    let template = '我是{{name}}，年龄{{age}}，性别{{sex}}'
    let person = {
        name: '小明',
        age: 12
    }
    let result = render(template, person)
    console.log(result)
}
test()
