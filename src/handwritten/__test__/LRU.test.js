const LRUCache = require('../LRU/v1')
// const LRUCache = require('../LRU/v2')

test('LRU 缓存测试', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    let val1 = cache.get(1)
    cache.put(3, 3)
    let val2 = cache.get(2)
    cache.put(4, 4)
    let val3 = cache.get(1)
    let val4 = cache.get(3)
    let val5 = cache.get(4)

    expect(val1).toBe(1)
    expect(val2).toBe(-1)
    expect(val3).toBe(-1)
    expect(val4).toBe(3)
    expect(val5).toBe(4)
})
