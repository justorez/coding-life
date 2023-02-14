class Scheduler {
    constructor(limit = 2) {
        this.queue = []
        this.limit = limit
        this.activeCount = 0
    }

    get pendingCount() {
        return this.queue.length
    }

    add(promiseCreator) {
        if (this.activeCount < this.limit) {
            this.activeCount++
            return promiseCreator()
                .then(res => {
                    this.activeCount--
                    this.next()
                    return res
                })
        } else {
            let resolve, reject
            let ret = new Promise((r, j) => { 
                resolve = r
                reject = j
            })
            this.queue.push(() => {
                promiseCreator()
                    .then(res => {
                        resolve(res)
                        this.activeCount--
                        this.next()
                    })
                    .catch(err => {
                        reject(err)
                        this.activeCount--
                        this.next()
                    })
            })
            return ret
        }
    }

    next() {
        if (this.pendingCount > 0 && this.activeCount < this.limit) {
            let task = this.queue.shift()
            this.activeCount++
            task()
        }
    }
}

const sleep = require('../../js/sleep')
function test() {
    const scheduler = new Scheduler(5)
    for (let i = 1; i <= 10; i++) {
        let task = async () => {
            await sleep(i * 500)
            return i
        }
        if (i === 5) {
            task = async () => {
                await sleep(i * 500)
                throw new Error('Test Case')
            } 
        }

        scheduler.add(task)
            .then(res => console.log(res, scheduler.activeCount, scheduler.pendingCount))
            .catch(console.error)
    }
}
test()
