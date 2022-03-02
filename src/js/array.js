/**
 * 数组去重
 * @param {array} arr 
 * @returns new array
 */
function unique(arr) {
    return arr.filter((item, index, array) => array.indexOf(item) === index)
}
function unique2(arr) {
    return [ ...new Set(arr) ]
}

/**
 * 数组扁平化
 * @param {array} arr
 * @returns new array 
 */
function flatten(arr) {
    while(arr.some(x => Array.isArray(x))) {
        arr = [].concat(...arr)
    }
    return arr
}
