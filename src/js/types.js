/**
 * 8 种数据类型：基本类型 + Object
 * 7 种基本类型：null、undefined、number、string、boolean、bigint、symbol
 * 
 * typeof null === 'object' ?
 * JS 最初版本中，使⽤ 32 位系统，为了性能考虑使⽤低位存储变量的类型信息，
 * 000 开头代表对象，然⽽ null 表示为全零，所以将它错误的判断为 object 。
 * 虽然现在的内部类型判断代码已经改变了，但这个 Bug 却⼀直流传下来了。
 */

const typeOf = (val) => Object.prototype.toString.call(val).slice(8, -1)

function isNull(val) {
    return typeOf(val) === 'Null'
}

function isUndefined(val) {
    return typeOf(val) === 'Undefined'
}

function isObject(val) {
    return typeOf(val) === 'Object'
}

function isString(val) {
    return typeOf(val) === 'String'
}

function isBoolean(val) {
    return typeOf(val) === 'Boolean'
}

function isFunction(val) {
    return typeOf(val) === 'Function'
        || isGeneratorFunction(val)
}

function isArray(val) {
    return Array.isArray(val)
}

function isMap(val) {
    return typeOf(val) === 'Map'
}

function isSet(val) {
    return typeOf(val) === 'Set'
}

function isRegExp(val) {
    return typeOf(val) === 'RegExp'
}

function isDate(val) {
    return typeOf(val) === 'Date'
}

function isPromise(val) {
    return typeOf(val) === 'Promise'
}

function isThenable(val) {
    return (isObject(val) || isFunction(val)) &&
        isFunction(val.then)
}

function isGenerator(val) {
    return typeOf(val) === 'Generator'
}

function isGeneratorFunction(val) {
    return typeOf(val) === 'GeneratorFunction'
}

function isBigInt(val) {
    return typeOf(val) === 'BigInt'
}

function isBrowserEnv() {
    try {
        return typeOf(window) === 'Window'
    } catch (error) {
        return false
    }
}

function isNodeEnv() {
    try {
        return typeOf(process) === 'Process'
    } catch (error) {
        return false
    }
}

module.exports = {
    isMap,
    isSet,
    isNull,
    isDate,
    isArray,
    isBigInt,
    isObject,
    isRegExp,
    isString,
    isBoolean,
    isPromise,
    isThenable,
    isFunction,
    isUndefined,
    isGenerator,
    isGeneratorFunction,
    isBrowserEnv,
    isNodeEnv
}
