/**
 * 最近最少使用
 * 偷懒版：利用 map 自身键值有序
 * 访问过的数据放到末尾；缓存满时，移除首数据
 */
class LRUCache {
    constructor(size) {
        this.size = size
        this.map = new Map()
    }

    get(key) {
        const has = this.map.has(key)
        if (has) {
            const val = this.map.get(key)
            this.map.delete(key)
            this.map.set(key, val)
            return val
        } else {
            return -1
        }
    }

    put(key, value) {
        this.map.delete(key)
        this.map.set(key, value)
        if (this.map.size > this.size) {
            const headKey = this.map.keys().next().value
            this.map.delete(headKey)
        }
    }
}

module.exports = LRUCache
