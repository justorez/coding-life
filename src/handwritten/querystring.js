function parse(url) {
    // 一、夹杂在 ? 与 # 之前的字符就是 qs，使用正则提取
    // 二、通过 Optional Chain 来避免空值错误
    const query = url.match(/\?([^/?#:]+)#?/)?.[1]
    if (!query) return {}

    return query.split('&').reduce((params, block) => {
        // 三、如果未赋值，则默认为空字符串
        let [k, v = ''] = block.split('=').map(decodeURIComponent)
        if (params[k] !== undefined) {
            // 处理 key 出现多次的情况，设置为数组
            params[k] = [].concat(params[k], v)
        } else {
            params[k] = v
        }
        return params
    }, {})
}

function stringify(params) {
    return Object.entries(params)
        .map(([k, v]) => {
            if (v === null || v === undefined || typeof v === 'object') {
                v = ''
            }
            return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        })
        .join('&')
}

// 使用内置对象
const qss = {
    parse(url) {
        const params = {}
        const searchParams = new URL(url).searchParams
        for (const k of searchParams.keys()) {
            params[k] = searchParams.getAll(k)
            params[k] = params[k].length === 1 ? params[k][0] : params[k]
        }
        return params
    },
    stringify(params) {
        return new URLSearchParams(params).toString()
    }
}

module.exports = {
    parse,
    stringify
}
