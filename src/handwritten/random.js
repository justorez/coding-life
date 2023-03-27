function number(min, max) {
    return min + Math.round(Math.random() * (max - min))
}

/**
 * 由 0-9, a-z 构成的随机字符串，最多 8 位
 * 
 * @param {number} len 
 */
function string(len = 8) {
    return Math.random().toString(36).slice(2, 2 + len)
}


module.exports = {
    number,
    string
}
