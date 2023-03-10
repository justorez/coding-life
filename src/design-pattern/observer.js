class Observer {
    constructor(name) {
        this.name = name
    }
    update({ type, info }) {
        // 假设任务分为日常route和战斗war
        if (type === 'route') {
            console.log(`${this.name}不需要日常任务`)
            return
        }
        this.goToTaskHome(info)
    }
    goToTaskHome(info) {
        console.log(`${this.name}去任务大殿抢${info}任务`)
    }
}

class Subject {
    constructor() {
        this.observerList = []
    }
    addObserver(observer) {
        this.observerList.push(observer)
    }
    notify(task) {
        console.log('>>> 发布五星任务')
        this.observerList.forEach(observer => observer.update(task))
    }
}

function main() {
    const subject = new Subject()
    const player1 = new Observer('玩家1')
    const player2 = new Observer('玩家2')

    // player1 player2 购买五星任务通知权限
    subject.addObserver(player1)
    subject.addObserver(player2)

    // 任务殿发布五星战斗任务
    const warTask = {
        type: 'war',
        info: '猎杀时刻'
    }

    // 任务大殿通知购买权限弟子
    subject.notify(warTask)

    // 任务殿发布五星日常任务
    const routeTask = {
        type: 'route',
        info: '种树浇水'
    }

    subject.notify(routeTask)
}
main()
