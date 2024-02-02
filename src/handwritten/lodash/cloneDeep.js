const typeOf = (val) => Object.prototype.toString.call(val).slice(8, -1)
const isObject = (val) => val !== null && typeof val === 'object'
const isDate = (val) => typeOf(val) === 'Date'
const isRegExp = (val) => typeOf(val) === 'RegExp'
const isArray = (val) => typeOf(val) === 'Array'

/**
 * structuredClone API 可实现深拷贝，不过支持的浏览器不多
 *
 * @param {Object} target
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone
 */
function cloneDeep(target, map = new WeakMap()) {
    // 基本类型
    if (!isObject(target)) {
        return target
    }

    // 处理循环引用
    if (map.has(target)) {
        return map.get(target)
    }

    // 特殊处理：正则、日期
    // 通常是不支持拷贝函数的，structuredClone 遇到函数会直接异常
    // 如果想拷贝函数，有两种写法：eval(target.toString()) 或 new Function(`return ${target.toString()}`)()
    if (isRegExp(target) || isDate(target)) {
        return new target.constructor(target)
    }

    // 数组类型
    const result = isArray(target) ? [] : {}
    map.set(target, result) // 缓存循环引用的拷贝结果

    /**
     * for...in 迭代除 Symbol 以外的可枚举属性，包括继承的可枚举属性。
     * 若使用 for...in 则要用 Object.hasOwn 过滤继承属性。
     * obj.hasOwnProperty 已不推荐使用。
     * 此处应直接使用 Object.keys
     */
    for (const prop of Object.keys(target)) {
        result[prop] = cloneDeep(target[prop], map)
    }
    return result
}

module.exports = cloneDeep
