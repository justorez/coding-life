module.exports = function (Constructor, ...args) {
    let obj = Object.create(Constructor.prototype)
    let ret = Constructor.apply(obj, args)
    return typeof ret === 'object' ? ret : obj
}
