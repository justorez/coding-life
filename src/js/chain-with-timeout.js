/**
 * 实现一个可以 timeout 的链式操作对象
 * u.console('breakfast').setTimeout(3000)
 *  .console('lunch').setTimeout(3000)
 *  .console('dinner')
 */
class U {
    constructor() {
        this.tasks = []
        // 构成链的一系列调用都是同步的，不断地被压入调用栈，执行结束，弹出调用栈
        // 而 setTimeout 封装一个事件（宏任务），被添加到消息队列末尾
        // 当构成链的一系列调用执行结束后，调用栈被清空
        // 主线程开始从消息队列中取出上述的宏任务去执行，即调用 this.next
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
