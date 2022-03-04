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
