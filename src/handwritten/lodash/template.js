/**
 * 版本一：简易字符串模板渲染
 *
 * ```js
 * let template = '我是{{name}}，年龄{{age}}，性别{{sex}}'
 * ```
 */
function _template(tpl) {
    // 注意：
    // 如果正则表达式设置了全局标志，reg.test 的执行会改变正则表达式 lastIndex 属性。
    // 连续的执行 reg.test，后续的执行将会从 lastIndex 处开始匹配字符串
    const reg = /\{\{(\w+)\}\}/g
    const groups = [...tpl.matchAll(reg)]

    return function (data) {
        if (groups.length <= 0) {
            return tpl
        }

        for (const group of groups) {
            const value = data[group[1]] || ''
            tpl = tpl.replace(group[0], value)
        }
        return tpl
    }
}

/**
 * 版本二：支持深层取值
 *
 * @param {string} tpl 模板字符串
 * @example
 * ```js
 * let template = `我是{{ user['name'] }}，年龄{{user.age}}，性别{{user["sex"]}}`
 * ```
 */
function template(tpl) {
    function get(object, path, defaultValue = '') {
        const paths = path.split('.')
        let result = object
        for (const p of paths) {
            result = result?.[p]
        }
        return result === undefined ? defaultValue : result
    }

    tpl = tpl
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/\["(\w+)"\]/g, '.$1')
        .replace(/\['(\w+)'\]/g, '.$1')

    return function (data) {
        // 写法1：直接通过 lodash.get
        // return tpl.replace(/{{\s*(['"\[\]\.\w\d]+)\s*}}/g, (_, path) => get(data, path))

        // 写法2：对模板预处理，不用每次都在 get 方法处理模板
        return tpl.replace(/{{\s*([.\w\d]+)\s*}}/g, (_, path) =>
            get(data, path)
        )
    }
}

module.exports = {
    template
}
