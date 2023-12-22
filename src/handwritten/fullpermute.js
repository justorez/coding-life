/**
 * 一维数组全排列：回溯算法
 * @param {Array} arr
 * @see https://juejin.cn/post/7021701684883619870
 */
function permute(arr) {
    const result = []

    function backtrack(arr, len, used, path) {
        // 递归出口
        // 如果到达叶子节点，将路径放入结果数组，并返回
        if (path.length === len) {
            result.push(path.join(''))
            return
        }

        // 遍历候选字符
        for (let i = 0; i < len; i++) {
            if (!used[i]) {
                path.push(arr[i])
                used[i] = true // 标记这个元素被使用过了
                backtrack(arr, len, used, path)
                path.pop() // 回溯【状态重置】撤销之前的操作
                used[i] = false
            }
        }
    }

    backtrack(arr, arr.length, [], [])
    return result
}

console.log(permute(['a', 'b', 'c']))

/**
 * 不定长二维数组全排列
 * @param {Array} arr
 */
function permute2D(arr) {
    return arr.reduce((prev, cur) => {
        if (!Array.isArray(prev) || !Array.isArray(cur)) return
        if (prev.length === 0) return cur
        if (cur.length === 0) return prev

        const tmp = []
        prev.forEach((x) => {
            cur.forEach((y) => {
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
console.log(permute2D(arr))
