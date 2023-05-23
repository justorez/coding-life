// 事件总线：发布-订阅模式
class EventEmitter  {
    constructor() {
        this.cache = {}
    }

    indexOf(name, fn) {
        return (this.cache[name] || []).findIndex(f => f === fn)
    }

    /**
     * 订阅事件
     * @param {string} name 事件名
     * @param {function} fn 回调函数
     */
    on(name, fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('非法 callback 类型')
        }

        const index = this.indexOf(name, fn)
        if (index !== -1) {
            return
        }

        if (this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [ fn ]
        }
    }

    /**
     * 单次订阅事件
     * @param {string} name 事件名
     * @param {function} fn 回调函数
     */
    once(name, fn) {
        fn._once = true
        this.on(name, fn)
    }

    /**
     * 取消订阅事件
     * @param {string} name 事件名
     * @param {function} fn 事件回调函数
     */
    off(name, fn) {
        const index = this.indexOf(name, fn)
        const tasks = this.cache[name]
        if (tasks && index >= 0) {
            tasks.splice(index, 1)
            tasks.length === 0 && delete this.cache[name]
        }
    }

    /**
     * 触发事件
     * @param {string} name 事件名
     * @param  {...any} args 其他参数
     */
    emit(name, ...args) {
        this._emit(name, ...args)
        this._emit('*', ...args)
    }

    _emit(name, ...args) {
        if (this.cache[name]) {
            const tasks = this.cache[name].slice()
            for (const fn of tasks) {
                fn(...args)
                fn._once && this.off(name, fn)
            }
        }
    }
}

function test() {
    const eventBus = new EventEmitter()
    eventBus.on('login', (msg) => {
        console.log('[login]', msg)
    })
    eventBus.on('login', () => {
        console.log('[login]', new Date().toLocaleString())
    })

    const fn = () => console.log('无效订阅')
    eventBus.on('login', fn)
    eventBus.off('login', fn)
    eventBus.on('*', (_, num) => {
        console.log('[*]', num)
    })
    eventBus.emit('login', 'I am leo', 18)

    eventBus.once('once-do', console.log)
    eventBus.emit('once-do', '[once-do]', new Date().toLocaleString())
    eventBus.emit('once-do', '[once-do]', new Date().toLocaleString())
}
test()
