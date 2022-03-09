const { isObject } = require('../types')

class WeakMap {
    constructor(entries) {
        this.uid = Symbol('WeakMap')
        if (entries !== undefined && entries !== null) {
            if (typeof entries[Symbol.iterator] === 'function') {
                try {
                    for (const [key, value] of entries) {
                        this.set(key, value)
                    }
                } catch {
                    throw TypeError(`Iterator value a is not an entry object`)
                }
            } else {
                throw TypeError(
                    `${entries} is not iterable (cannot read property Symbol(Symbol.iterator))`
                )
            }
        }
    }
    
    set(key, value) {
        if (!isObject(key)) {
            throw new TypeError('Invalid value used as weak map key')
        }
        
        if (Reflect.has(key, this.uid)) {
            const entry = key[this.uid]
            entry[1] = value
            return this
        }
        
        Reflect.defineProperty(key, this.uid, {
            value: [key, value],
            configurable: true,
            writable: false,
            enumerable: false
        })
        
        return this
    }
    
    has(key) {
        if (!isObject(key)) return false
        if (Reflect.has(key, this.uid)) return true
        return false
    }
    
    get(key) {
        if (!isObject(key)) return undefined
        const entry = key[this.uid]
        return entry && entry[1]
    }
    
    delete(key) {
        if (!isObject(key)) return false
        if (!Reflect.has(key, this.uid)) return false
        return Reflect.deleteProperty(key, this.uid)
    }
}

Reflect.defineProperty(WeakMap.prototype, Symbol.toStringTag, {
    value: 'WeakMap'
})

module.exports = WeakMap
