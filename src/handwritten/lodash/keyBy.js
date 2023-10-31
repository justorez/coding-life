/**
 * @param {array} arr 
 * @param {function} by 
 */
function keyBy(arr, by) {
    return arr.reduce((res, o) => {
        res[by(o)] = o
        return res
    }, {})
}

const info = [
    {id: 1, name: 'Tom'},
    {id: 2, name: 'Jack'}
]
//=> { '1': { id: 1, name: 'Tom' }, '2': { id: 2, name: 'Jack' } }
console.log(keyBy(info, (x) => x.id))

module.exports = {
    keyBy
}
