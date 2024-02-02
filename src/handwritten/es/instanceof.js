/**
 * 判断对象的原型链是不是能找到类型的 prototype
 *
 * instanceof 针对基本类型都是 false；
 * 使用 Object.getPrototypeOf 可以让基本类型的判断为 true；
 * Reflect.getPrototypeOf 参数必须是对象
 * @param {*} instance
 * @param {*} Type
 */
function instanceOf(instance, Type) {
    if (typeof instance !== 'object') {
        return false
    }

    instance = Reflect.getPrototypeOf(instance) // instance.__proto__
    const prototype = Type.prototype

    for (;;) {
        if (instance === null) {
            return false
        }

        if (instance === prototype) {
            return true
        }
        instance = Reflect.getPrototypeOf(instance) // instance.__proto__
    }
}

module.exports = instanceOf
