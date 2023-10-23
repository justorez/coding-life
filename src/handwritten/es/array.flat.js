/**
 * depth 传入 Infinity 可展开任意深度的嵌套数组
 * @param {number} depth
 */
Array.prototype._flat = function (depth = 1) {
    if (depth === 0) return this

    // 不要用 Array.from，会把空元素赋值为 undefined，
    // 导致下面 reduce 无法跳过空元素
    const array = this.concat()

    return array.reduce((res, cur) => {
        // reduce 会自动跳过空元素
        return res.concat(Array.isArray(cur) ? cur._flat(depth - 1) : cur)
    }, [])
}
