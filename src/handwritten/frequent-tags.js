/**
 * 找到当前页面出现次数前 top 多的标签
 * 
 * @param {number} top
 */
function getMaxFreguentTag(top = 1) {
    const tags = [...document.querySelectorAll('*')].reduce((res, tag) => {
        const name = tag.localName // tagName
        res[name] = res[name] ? res[name] + 1 : 1
        return res
    }, {})
    const entries = Object.entries(tags)
    console.log(entries)
    // entries.reduce((x, y) => x[1] > y[1] ? x : y) // 找出最大频次
    let res = new Array(top)
    entries.forEach(tag => saveMax(res, tag))
    return res.sort((x, y) => y[1] - x[1])
}

/**
 * 新值如果大于频次数组中的最小值，则新值替换最小值；
 * 新值等于最小值，则拼接标签名
 * 
 * @param {[string, number][]} entries 
 * @param {[string, number]} entry 
 * @param {boolean} equal 
 */
function saveMax(entries, entry, equal = true) {
    const vals = entries.map(x => x ? x[1] : 0)
    const min = Math.min(...vals)
    const minIdx = vals.indexOf(min)
    const empty = vals.findIndex(v => v === undefined)
    if (empty !== -1) {
        entries[empty] = entry
    } else if (entry[1] > min) {
        entries[minIdx] = entry
    } else if (equal && entry[1] === min) {
        entries[minIdx][0] += ',' + entry[0]
    }
    return entries
}
