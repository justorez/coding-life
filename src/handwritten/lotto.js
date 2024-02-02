let peoples = [
    { n: 'p1', w: 100 },
    { n: 'p2', w: 200 },
    { n: 'p3', w: 1 }
]

/**
 * 请实现抽奖函数 rand，保证随机性
 * 输入为表示对象数组，对象有属性 n 表示人名，w 表示权重
 * 随机返回一个中奖人名，中奖概率和 w 成正比
 *
 * 思路一：
 * 建一个大数组，以 p1 为例，权重 100，则在数组中填充 100 个 p1，
 * 在大数组索引范围内取随机数，返回对应的结果。
 *
 * 思路一优化：
 * 无需生成大数组，为每一个人计算中奖范围即可。节省空间，节省大数组填充的耗时
 *
 * @param {People[]} p
 */
function rand(p) {
    p = p.map((x) => ({ ...x })) // 拷贝一份
    let sum = 0,
        i = 0
    for (const item of p) {
        item.range = [i, i + item.w]
        i = i + item.w
        sum += item.w
    }
    const index = Math.round(Math.random() * (sum - 1))
    const res = p.find((x) => index >= x.range[0] && index < x.range[1])
    return res.n
}

const result = []
for (let i = 0; i < 1000; i++) {
    result.push(rand(peoples))
}
console.log(result.filter((x) => x === 'p1').length)
console.log(result.filter((x) => x === 'p2').length)
console.log(result.filter((x) => x === 'p3').length)
