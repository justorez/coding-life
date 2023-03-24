/**
 * @param {object[]} data 
 */
function find(data) {
    return {
        data,
        get value() {
            return this.data.map(d => ({...d}))
        },
        /**
         * @param {object} match 
         */
        where(match) {
            this.data = this.data.filter((item) => {
                return Object.entries(match).every(([key, value]) => {
                    if (value instanceof RegExp) {
                        return value.test(item[key])
                    } else if (value instanceof Function) {
                        return Boolean(value(item[key]))
                    }
                    return item[key] === value
                })
            })
            return this
        },
        /**
         * @param {string} key 
         * @param {'asc' | 'desc'} type
         */
        orderBy(key, type = 'asc') {
            this.data.sort((x, y) => type === 'asc' ? x[key] - y[key] : y[key] - x[key])
            return this
        }
    }
}

const data = [
    {id: 8, title: 'good'},
    {id: 11, title: 'other'},
    {id: 12, title: null},
    {id: 16, title: 'haha3'},
    {id: 19, title: 'happy2'}
]
// 找出 data 中 title 以数字结尾且 id 大于 11 的项，并以 id 降序排列
const result = find(data)
    .where({
        title: /\d$/,
        id: x => x > 11
    })
    .orderBy('id', 'desc')

//=> [ { id: 19, title: 'happy2' }, { id: 16, title: 'haha3' } ]
console.log(result.value)
