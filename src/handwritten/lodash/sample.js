/**
 * 从数组随机取一个元素
 * @param {Array} array
 */
function sample(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function sampleSize(array, size = 1) {
    size = size > 0 ? size : 0
    return shuffle(array).slice(0, size)
}
function shuffle(array) {
    const arr = Array.from(array)
    let lastIndex = arr.length
    while (--lastIndex) {
        const index = Math.floor(Math.random() * lastIndex)
        ;[arr[lastIndex], arr[index]] = [arr[index], arr[lastIndex]]
    }
    return arr
}

module.exports = {
    sample,
    sampleSize
}
