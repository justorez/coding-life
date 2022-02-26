import sleep from "./sleep.js"

/**
 * 简易调度器
 * 限制同时在执行中的异步操作的最大的数量
 */
class Scheduler {
    /**
     * @param {number} concurrency 最大并发数
     */
    constructor(concurrency) {
        if (concurrency && !(Number.isInteger(concurrency) && concurrency > 0)) {
            throw new TypeError('concurrency 应为大于 0 的整数')
        }

        this.queue = []
        this.concurrency = concurrency || Number.POSITIVE_INFINITY
        this.activeCount = 0 // 正在执行的任务数
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
        const next = async () => {
            // 因为 activeCount 是异步更新，所以需要等待下一轮微任务被执行时，
            // 再去比较 activeCount 和 concurrency，以保证 activeCount 是最新值
            await Promise.resolve()

            if (this.pendingCount > 0 && this.activeCount < this.concurrency) {
                this.run()
            }
        }
        next()
    }
   
    async run() {
        if (this.pendingCount <= 0) {
            return
        }

        this.activeCount++
        let { action, args, onSuccess, onError } = this.queue.shift()
        args = Array.isArray(args) ? args : []
        const actionFn = (async () => action(...args)) // 保证函数均为 async
        try {
            const result = await actionFn()
            onSuccess && onSuccess(result)
        } catch (err) {
            onError && onError(err)
        } finally {
            this.activeCount--
            this.run()
        }
    }

    clear() {
        this.activeCount = 0
        this.queue = []
    }
}

function test() {
    const scheduler = new Scheduler(5)
    for (let i = 1; i <= 10; i++) {
        const task = {
            action: async () => {
                await sleep(i * 1000)
                return i
            },
            onSuccess: res => console.log(res, scheduler.activeCount, scheduler.pendingCount),
            onError: console.error
        }
        scheduler.add(task)
    }
}
test()
