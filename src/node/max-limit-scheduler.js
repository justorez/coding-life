/**
 * 简易调度器
 * 限制同时在执行中的异步操作的最大的数量
 */
class Scheduler {
    constructor(max) {
        this.pool = new Map()
        this.waitingQueue = []
        this.max = max || 20
    }

    __id() {
        return String(Math.floor(Math.random() * 10000000))
    }

    /**
     * 添加任务并执行
     * @param {Object} task 异步任务
     * @param {function} task.action 异步函数
     * @param {function} task.successFn 执行成功的回调
     * @param {function} task.errorFn 执行失败的回调
     */
    add(task) {
        const id = this.__id()
        if (pool.size >= this.max) {
            this.waitingQueue.push(task)
        } else {
            this.pool.set(id, task)
        }
        this.run()
    }

    /**
     * 任务执行完成后，调度等待队列中的任务
     * @param {string} id 任务ID
     */
    __after(id) {
        this.pool.delete(id)
        const task = this.waitingQueue.shift()
        task && this.add(task)
    }

    /**
     * 执行任务池的中的任务
     */
    run() {
        for (const id of this.pool.keys()) {
            const task = this.pool.get(id)
            if (task.loading) {
                continue
            }
            task.loading = true
            task.action()
                .then(task.successFn)
                .then(() => this.__after(id))
                .catch((e) => {
                    task.errorFn(e)
                    this.__after(id)
                })
        }
    }
}
