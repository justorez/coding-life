const { isObject, isDate, isRegExp, isArray } = require('../js/types')

/**
 * structuredClone API 可实现深拷贝，不过支持的浏览器不多
 * 
 * @param {Object} target 
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone
 */
function deepClone(target, map = new WeakMap()) {
    if (!isObject(target)) {
        return target
    }

    if (map.has(target)) {
        return map.get(target)
    }

    // 特殊处理：正则、日期
    // 通常是不支持拷贝函数的，structuredClone 遇到函数会直接异常
    // 如果想拷贝函数，有两种写法：eval(target.toString()) 或 new Function(`return ${target.toString()}`)()
    if (isRegExp(target) || isDate(target)) {
        return new target.constructor(target)
    }

    const cloneTarget = isArray(target) ? [] : {}
    map.set(target, cloneTarget)  // 缓存循环引用的拷贝结果
    for (const prop in target) { // 迭代一个对象的除 Symbol 以外的可枚举属性，包括继承的可枚举属性
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop], map)
        }
    }
    return cloneTarget
}

module.exports = deepClone
