const _ = require('lodash')

/**
 * Sets the value at path of object. If a portion of path doesn’t exist it’s created.
 * Arrays are created for missing index properties while objects are created for all other missing properties.
 *
 * @param object The object to modify.
 * @param {string|any[]} path The path of the property to set.
 * @param value The value to set.
 * @return Returns object.
 */
function set(object, path, value) {
    // a[0].b.c -> ['a', '0', 'b', 'c']
    const keys = !Array.isArray(path)
        ? path.replace(/\[["']?(\w+)['"]?\]/g, '.$1').split('.')
        : path

    let current = object
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        if (i === keys.length - 1) {
            current[key] = value
        } else {
            if (
                !Reflect.has(current, key) ||
                typeof current[key] !== 'object'
            ) {
                const nextKey = keys[i + 1]
                current[key] = isNaN(Number(nextKey)) ? {} : []
            }
            current = current[key]
        }
    }

    return object
}

module.exports = {
    set
}
