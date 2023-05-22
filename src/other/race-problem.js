/**
 * 前端竞态问题
 */

// 取消上次请求
let controllerMap = {}
function req(url) {
    if (controllerMap[url]) {
        controllerMap[url].abort()
    }
    controllerMap[url] = new AbortController()
    const signal = controllerMap[url].signal
    return fetch(url, { signal }).catch((err) => {
        if (err.name === 'AbortError') {
            // 忽略
        }
    })
}

// 全局 loading
// 禁止重复点击
// 并发请求时，需要解决被提前关闭的问题
class Loading {
    constructor() {
        this.queue = []
        this.zIndex = 0
    }
    show() {
        this.queue.push(++this.zIndex)
    }
    hide() {
        this.queue.shift()
        if (this.queue.length === 0) {
            // 这时才关闭遮罩
        }
    }
}

// 抛弃无用请求响应
let globalId = 0
function query(keyword) {
    let curId = ++globalId
    return axios
        .post('/list', { keyword })
        .then((res) => {
            if (globalId === curId) {
                return res
            } else {
                return Promse.reject('无用的请求响应')
            }
        })
}
