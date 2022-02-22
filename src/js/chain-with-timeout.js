/**
 * 实现一个可以 timeout 的链式操作对象
 * u.console('breakfast').setTimeout(3000)
 *  .console('lunch').setTimeout(3000)
 *  .console('dinner')
 */
class U {
    constructor() {
        this.tasks = []
        // 构成链是同步操作
        // setTimeout 是宏任务，异步操作
        // 所以会在链形成后，调用 this.next
        setTimeout(() => {
            this.next()
        })
    }

    next() {
        const task = this.tasks.shift()
        task && task()
    }

    console(...args) {
        const task = () => {
            console.log(...args)
            this.next()
        }
        this.tasks.push(task)
        return this
    }

    setTimeout(delay) {
        const task = () => {
            setTimeout(() => {
                this.next()
            }, delay)
        }
        this.tasks.push(task)
        return this
    }
}

function test() {
    const u = new U()
    u.console('breakfast')
        .setTimeout(3000)
        .console('lunch')
        .setTimeout(3000)
        .console('dinner')
}
test()
