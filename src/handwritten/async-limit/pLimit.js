/**
 * @link https://github.com/sindresorhus/p-limit
 */
class pLimit {
    constructor(concurrency = Infinity) {
        const isInteger = Number.isInteger(concurrency) ||
            concurrency === Number.POSITIVE_INFINITY

        if (!(isInteger && concurrency > 0)) {
            throw new TypeError(
                'Expected `concurrency` to be a number from 1 and up'
            )
        }

        this.queue = []
        this.concurrency = concurrency
        this.activeCount = 0
    }
    
    get pendingCount() {
        return this.queue.length
    }

    add(fn, ...args) {
        return new Promise((resolve) => {
            this.queue.push(this.run.bind(this, fn, args, resolve))
            ;(async () => {
                // This function needs to wait until the next microtask 
                // before comparing `activeCount` to `concurrency`, 
                // because `activeCount` is updated asynchronously
                // when the run function is dequeued and called. The comparison in the if-statement
                // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
                await Promise.resolve()

                if (this.activeCount < this.concurrency && this.pendingCount > 0) {
                    this.queue.shift()()
                }
            })()
        })
    }

    async run(fn, args, resolve) {
        this.activeCount++
        const result = fn(...args)
        resolve(result)
        try {
            await result
        } catch {}
        this.next()
    }

    next() {
        this.activeCount--
        if (this.pendingCount > 0) {
            this.queue.shift()()
        }
    }

    clearQueue() {
        this.queue = []
    }
}

const { sleep } = require('../../js/sleep')
function test() {
    const scheduler = new pLimit(2)
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
