class Scheduler {
    constructor(concurrency = Infinity) {
        this.queue = []
        this.concurrency = concurrency
        this.activeCount = 0
    }

    get pendingCount() {
        return this.queue.length
    }

    add(promiseCreator, ...args) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => {
                Promise.resolve(promiseCreator(...args))
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                        this.activeCount--
                        this.next()
                    })
            })
            this.next()
        })
    }

    next() {
        if (this.pendingCount > 0 && this.activeCount < this.concurrency) {
            this.activeCount++
            this.queue.shift()()
        }
    }
}

module.exports = Scheduler
