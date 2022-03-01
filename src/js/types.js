const getType = (val) => Object.prototype.toString.call(val)

function isNull(val) {
    return getType(val) === '[object Null]'
}

function isUndefined(val) {
    return getType(val) === '[object Undefined]'
}

function isObject(val) {
    return getType(val) === '[object Object]'
}

function isString(val) {
    return getType(val) === '[object String]'
}

function isArray(val) {
    return Array.isArray(val)
}

function isMap(val) {
    return getType(val) === '[object Map]'
}

function isSet(val) {
    return getType(val) === '[object Set]'
}

function isRegExp(val) {
    return getType(val) === '[object RegExp]'
}

function isDate(val) {
    return getType(val) === '[object Date]'
}

function isPromise(val) {
    return getType(val) === '[object Promise]'
}

function isGenerator(val) {
    return getType(val) === '[object Generator]'
}

function isGeneratorFunction(val) {
    return getType(val) === '[object GeneratorFunction]'
}

module.exports = {
    isMap,
    isSet,
    isNull,
    isDate,
    isArray,
    isObject,
    isRegExp,
    isString,
    isPromise,
    isUndefined,
    isGenerator,
    isGeneratorFunction
}
