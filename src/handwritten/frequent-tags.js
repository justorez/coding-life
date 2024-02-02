/**
 * 找到当前页面出现次数前 top 多的标签
 *
 * @param {number} top
 */
function getMaxFreguentTag(top = 1) {
    const tags = [...document.querySelectorAll('*')]
        .map((el) => el.tagName)
        .reduce((res, tag) => {
            res[tag] = res[tag] ? res[tag] + 1 : 1
            return res
        }, {})

    // 利用数组把标签排序
    const sortedTags = []
    for (const [k, v] of Object.entries(tags)) {
        sortedTags[v] ||= []
        sortedTags[v].push(k)
    }

    // 数组末尾 top 个非空元素，即所要的结果
    const res = []
    const len = Math.min(top, sortedTags.length)
    for (let i = 0; i < len; ) {
        const tag = sortedTags.pop()
        if (tag) {
            res.push(...tag) // 包含同频次标签
            i++
        }
    }
    return res
}

// 借助辅助函数 saveMax 实现
function _getMaxFreguentTag(top = 1) {
    const tags = [...document.querySelectorAll('*')].reduce((res, tag) => {
        const name = tag.localName // tagName
        res[name] = res[name] ? res[name] + 1 : 1
        return res
    }, {})
    const entries = Object.entries(tags)
    console.log(entries)
    // entries.reduce((x, y) => x[1] > y[1] ? x : y) // 找出最大频次
    let res = new Array(top)
    entries.forEach((tag) => saveMax(res, tag))
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
    const vals = entries.map((x) => (x ? x[1] : 0))
    const min = Math.min(...vals)
    const minIdx = vals.indexOf(min)
    const empty = vals.findIndex((v) => v === undefined)
    if (empty !== -1) {
        entries[empty] = entry
    } else if (entry[1] > min) {
        entries[minIdx] = entry
    } else if (equal && entry[1] === min) {
        entries[minIdx][0] += ',' + entry[0]
    }
    return entries
}
