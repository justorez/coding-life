/**
 * 限制最大并发数的调度器
 */
class Scheduler {
    /**
     * @param {number} concurrency 最大并发数
     */
    constructor(concurrency = Infinity) {
        const isInteger = Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY
        if (!(isInteger && concurrency > 0)) {
            throw new TypeError('concurrency 应为大于 0 的整数')
        }

        this.queue = []
        this.concurrency = concurrency
        this.activeCount = 0 // 正在执行的任务数
        this.runAsync = queueMicrotask || setTimeout || process.nextTick
    }

    /**
     * 队列中等待的任务数
     */
    get pendingCount() {
        return this.queue.length
    }

    /**
     * 添加任务并执行
     * @param {Object} task 异步任务
     * @param {function} task.action 待执行函数
     * @param {Array} task.args 函数传参
     * @param {function} task.onSuccess 执行成功的回调
     * @param {function} task.onError 执行失败的回调
     */
    add(task) {
        this.queue.push(task)
        if (this.pendingCount > 0 && this.activeCount < this.concurrency) {
            this.run()
        }
    }
    
    async run() {
        if (this.pendingCount <= 0) {
            return
        }

        this.activeCount++
        let { action, args, onSuccess, onError } = this.queue.shift()
        args = [].concat(args)
        try {
            const result = await action(...args)
            // 注意：要保证成功或异步回调在微任务中执行，
            // 否则 activeCount 值错误，并且 run（下个任务）会被阻塞
            onSuccess && this.runAsync(() => onSuccess(result))
        } catch (err) {
            onError && this.runAsync(() => onError(err))
        } finally {
            this.activeCount--
            this.run()
        }
    }

    clear() {
        this.queue = []
    }
}

const sleep = require('../../js/sleep')
function test() {
    const scheduler = new Scheduler(2)
    for (let i = 1; i <= 10; i++) {
        const task = {
            action: async (i) => {
                if (i === 5) {
                    throw new Error('Test Case ' + i)
                }
                return sleep(500).then(() => i)
            },
            args: [i],
            onSuccess: res => console.log(res, scheduler.activeCount, scheduler.pendingCount),
            onError: console.error
        }
        scheduler.add(task)
    }
}
test()
