const { isObject, isDate, isRegExp, isArray } = require('../js/types')

function deepClone(target, map = new WeakMap()) {
    if (map.get(target)) {
        return target
    }

    // 获取当前值的构造函数：获取它的类型
    const constructor = target.constructor

    // 检测当前对象 target 是否为正则或日期格式
    if (isRegExp(target) || isDate(target)) {
        return new constructor(target)
    }

    if (isObject(target)) {
        map.set(target, true)  // 为循环引用的对象做标记
        const cloneTarget = isArray(target) ? [] : {}
        for (const prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map)
            }
        }
        return cloneTarget
    } else {
        return target
    }
}

module.exports = deepClone
