/**
 * 不定长二维数组全排列
 * 
 * @param {Array} arr 
 */
function fn(arr) {
    return arr.reduce((prev, cur) => {
        if (!Array.isArray(prev) || !Array.isArray(cur)) return
        if (prev.length === 0) return cur
        if (cur.length === 0) return prev

        const tmp = []
        prev.forEach(x => {
            cur.forEach(y => {
                tmp.push(`${x}${y}`)
            })
        })
        return tmp
    }, [])
}

var arr = [
    ['A', 'B', 'C'],
    [1, 2, 3],
    ['X', 'Y', 'Z']
]
console.log(fn(arr))
