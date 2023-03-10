/**
 * 事件中心
 * 发布者和订阅者互相不知道对方的存在
 */
class EventHub {
    constructor() {
        // 事件中心
        // 存储格式: { warTask: [], routeTask: [] }
        // 每种事件(任务)下存放其订阅者的回调函数
        this.events = {}
    }
    /**
     * 订阅
     * @param {string} type 
     * @param {Function} cb 
     */
    subscribe(type, cb) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        this.events[type].push(cb)
    }
    /**
     * 发布
     * @param {string} type 
     * @param  {...any} args 
     */
    publish(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach((cb) => cb(...args))
        }
    }
    /**
     * 取消订阅
     * @param {string} type 
     * @param {Function} cb 
     */
    unsubscribe(type, cb) {
        const cbList = this.events[type]
        if (cbList) {
            const cbIndex = cbList.findIndex((e) => e === cb)
            if (cbIndex != -1) {
                cbList.splice(cbIndex, 1)
            }
        }
        if (cbList.length === 0) {o
            Reflect.deleteProperty(this.events, type)
        }
    }
    /**
     * @param {string} type 
     */
    unsubscribeAll(type) {
        if (this.events[type]) {
            Reflect.deleteProperty(this.events, type)
        }
    }
}

class Publisher {
    /**
     * @param {EventHub} eventHub 
     */
    constructor(eventHub) {
        this.eventHub = eventHub
    }

    /**
     * @param {string} event 
     * @param  {...any} args 
     */
    publish(event, ...args) {
        this.eventHub.publish(event, ...args)
    }
}

class Subscriber {
    /**
     * @param {EventHub} eventHub 
     */
     constructor(eventHub) {
        this.eventHub = eventHub
    }

    /**
     * @param {string} event 
     * @param {Function} handler 
     */
    subscribe(event, handler) {
        this.eventHub.subscribe(event, handler)
    }
}

function main() {
    // 创建一个中介公司
    const eventHub = new EventHub()
    const player1 = new Subscriber(eventHub)
    const player2 = new Subscriber(eventHub)
    const pub1 = new Publisher(eventHub) // 负责战斗任务
    const pub2 = new Publisher(eventHub) // 负责日常任务

    // 玩家一订阅战斗任务
    player1.subscribe('warTask', (taskInfo) => {
        console.log('player1 宗门殿发布战斗任务，任务信息:' + taskInfo)
    })
    // 玩家一订阅日常任务
    player1.subscribe('routeTask', (taskInfo) => {
        console.log('player1 宗门殿发布日常任务，任务信息:' + taskInfo)
    })
    // 玩家二订阅全类型任务
    player2.subscribe('allTask', (taskInfo) => {
        console.log('player2 宗门殿发布五星任务，任务信息:' + taskInfo)
    })

    // 发布战斗任务
    pub1.publish('warTask', '猎杀时刻')
    pub1.publish('allTask', '猎杀时刻')

    // 发布日常任务
    pub2.publish('routeTask', '种树浇水')
    pub2.publish('allTask', '种树浇水')
}
main()
