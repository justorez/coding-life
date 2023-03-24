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
                    .then(res => {
                        this.activeCount--
                        resolve(res)
                        this.next()
                    })
                    .catch(err => {
                        this.activeCount--
                        reject(err)
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

const sleep = require('../../js/sleep')
function test() {
    const scheduler = new Scheduler(2)
    for (let i = 1; i <= 10; i++) {
        let task = async (i) => {
            if (i === 5) {
                throw new Error('Test Case ' + i)
            }
            return sleep(500).then(() => i)
        }

        scheduler.add(task, i)
            .then(res => console.log(res, scheduler.activeCount, scheduler.pendingCount))
            .catch(console.error)
    }
}
test()
