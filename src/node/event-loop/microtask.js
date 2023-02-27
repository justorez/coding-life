const log = (args) => process.stdout.write(args + ' ')

/**
 * Node 10 以后，微任务执行顺序已经和浏览器保持一致了。
 * 即：事件循环阶段队列的每个任务执行完后 立即执行它产生的所有微任务以及微任务执行阶段产生的微任务。
 * 不再是等队列中所有任务执行完才执行微任务。
 */
function t1() {
    setTimeout(() => {
        log('s1')
        Promise.resolve().then(() => log('m1'))
    })
    setTimeout(() => {
        log('s2')
        Promise.resolve().then(() => log('m2'))
    })
}
// t1()

function t2() {
    const task = (n = 1) => {
        Promise.resolve().then(() => {
            log(n)
            n < 10 && task(n + 1) // 如果不终止，setTimeout 会一直被阻塞
        })
    }
    setTimeout(() => log('\ntimer'), 0)
    task()
}
t2()
