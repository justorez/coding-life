class DoubleLinkedListNode {
    constructor(key, val) {
        this.prev = null
        this.next = null
        this.key = key
        this.val = val
    }
}

/**
 * 双向链表 + 哈希表
 * 首先使用哈希表进行定位，找出缓存项在双向链表中的位置，随后将其移动到双向链表的头部，即可在 O(1) 的时间内完成 get 或者 put 操作。
 * @link https://leetcode.cn/problems/lru-cache/solution/lruhuan-cun-ji-zhi-by-leetcode-solution/
 */
class LRUCache {
    /**
     * @param {number} capacity 
     */
    constructor(capacity) {
        const head = new DoubleLinkedListNode()
        const tail = new DoubleLinkedListNode()

        head.next = tail
        tail.prev = head

        this.list = head
        this.tail = tail
        this.data = new Map()
        this.capacity = capacity
    }

    get(key) {
        if (this.data.has(key)) {
            this.visit(key)
            return this.list.next.val
        }
        return -1
    }

    /**
     * 缓存满时，移除链表尾节点
     * @param {*} key 
     * @param {*} value 
     */
    put(key, value) {
        if (this.data.has(key)) {
            this.visit(key)
            this.data.get(key).val = value
        } else {
            const node = new DoubleLinkedListNode(key, value)
            const oldHead = this.list.next

            this.list.next = node
            node.prev = this.list
            node.next = oldHead
            oldHead.prev = node

            this.data.set(key, node)

            if (this.data.size > this.capacity) {
                const tail = this.tail.prev

                this.data.delete(tail.key)
                this.tail.prev = tail.prev
                tail.prev.next = this.tail
            }
        }
    }

    /**
     * 若 key 存在，则把节点移动到表头
     * @param {*} key 
     */
    visit(key) {
        if (this.data.has(key)) {
            const node = this.data.get(key)
            node.prev.next = node.next
            node.next.prev = node.prev

            // add to head
            const oldHead = this.list.next
            this.list.next = node
            node.next = oldHead
            node.prev = this.list
            oldHead.prev = node
        }
    }
}

module.exports = LRUCache