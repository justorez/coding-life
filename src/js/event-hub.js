// 事件中心：发布-订阅模式
class EventHub {
    constructor() {
        this.subs = new Map()
    }

    /**
     * 订阅事件
     * @param {string} eventName 事件名
     * @param {function} callback 回调函数
     */
    on(eventName, callback) {
        let sub = this.subs.get(eventName)
        let isEmpty = !(sub && sub.push(callback))
        if (isEmpty) {
            this.subs.set(eventName, [callback])
        }
    }

    /**
     * 取消订阅事件
     * @param {string} eventName 事件名
     * @param {function} callback 事件回调函数
     */
    off(eventName, callback) {
        const sub = this.subs.get(eventName)
        if (!sub) {
            return
        }
        const idx = sub.indexOf(callback)
        if (idx !== -1) {
            sub.splice(idx, 1)
        }
    }

    emit(eventName, ...args) {
        this.__emit(eventName, ...args)
        this.__emit('*', ...args)
    }

    /**
     * 触发事件
     * @param {string} eventName 事件名
     * @param  {...any} args 其他参数
     */
    __emit(eventName, ...args) {
        (this.subs.get(eventName) || []).forEach(fn => {
            if (typeof fn === 'function') {
                fn.apply(this, args)
            }
        })
    }
}

function test() {
    const eventHub = new EventHub()
    eventHub.on('login', (msg) => {
        console.log('[login]', msg)
    })
    eventHub.on('login', () => {
        console.log('[login]', new Date().toLocaleString())
    })

    const fn = () => console.log('无效订阅')
    eventHub.on('login', fn)
    eventHub.off('login', fn)
    eventHub.on('*', (_, num) => {
        console.log('test is ok.', num)
    })
    eventHub.emit('login', 'I am leo', 18)
}
test()
