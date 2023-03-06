/**
 * 最近最少使用
 * 偷懒版：利用 map 自身键值有序
 * 访问过的数据放到末尾；缓存满时，移除首数据
 */
class LRUCache {
    /**
     * @param {Number} capacity 
     */
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
    }

    get(key) {
        if (this.map.has(key)) {
            const val = this.map.get(key)
            this.map.delete(key)
            this.map.set(key, val)
            return val
        }
        return -1
    }

    put(key, value) {
        if (this.map.size === this.capacity) {
            const head = this.map.keys().next()
            this.map.delete(head.value)
        }
        this.map.set(key, value)
    }
}

module.exports = LRUCache
