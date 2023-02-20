/**
 * 实现一个可以 sleep 的链式操作对象
 * lazyMan('Leo')
 *  .eat('breakfast').sleep(3)
 *  .eat('lunch').sleep(2)
 *  .eat('dinner')
 */
class LazyMan {
    constructor(name) {
        this.tasks = []
        this.tasks.push(() => {
            console.log(`Hi! This is ${name}.`)
            this.next()
        })
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

    eat(...foods) {
        const task = () => {
            console.log(`Eat ${foods.join()}.`)
            this.next()
        }
        this.tasks.push(task)
        return this
    }

    sleep(time) {
        return this.sleepWrapper(time)
    }

    sleepFirst(time) {
        return this.sleepWrapper(time, true)
    }

    sleepWrapper(time, first = false) {
        const task = () => {
            // console.log(`Wake up after ${time}s.`)
            setTimeout(() => {
                this.next()
            }, time * 1000)
        }
        if (first) {
            const intro = this.tasks.shift()
            this.tasks.unshift(intro, task)
        } else {
            this.tasks.push(task)
        }
        return this
    }
}

function test() {
    const lazyMan = (name) => new LazyMan(name)
    lazyMan('Leo')
        .eat('breakfast').sleep(2)
        .eat('lunch').sleepFirst(1).sleep(2)
        .eat('dinner')
}
test()
