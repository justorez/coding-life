/**
 * 判断对象的原型链是不是能找到类型的 prototype
 * instanceof 针对基本类型都是 false；
 * 使用 Object.getPrototypeOf 可以让基本类型的判断为 true
 * @param {*} instance 
 * @param {*} type 
 */
function instanceOf(instance, type) {
    if (typeof instance !== 'object') {
        return false
    }

    instance = instance.__proto__
    const prototype = type.prototype

    while(true) {
        if (instance === null) {
            return false
        }

        if (instance === prototype) {
            return true
        }
        instance = instance.__proto__
    }
}

module.exports = instanceOf
