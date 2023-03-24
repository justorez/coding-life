/**
 * @param {object[]} array 
 * @param {function} by 
 */
function groupBy(array, by) {
    return array.reduce((res, o) => {
        const key = by(o)
        res[key] ? res[key].push(o) : (res[key] = [o])
        return res
    }, {})
}

const result = groupBy(
    [
        { id: 1, name: '山月', sex: 'male' },
        { id: 2, name: '张三', sex: 'female' },
        { id: 3, name: '李四', sex: 'female' }
    ],
    (x) => x.sex
)
console.log(result)
