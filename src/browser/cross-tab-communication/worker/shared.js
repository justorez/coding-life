// 通过下面地址才能调试 SharedWorker
// edge://inspect/#workers
const portPool = []
self.onconnect = (e) => {
    console.log('connected')
    const port = e.ports[0]
    portPool.push(port)

    port.onmessage = (event) => {
        console.log(event.data)
        portPool.forEach((p) => p.postMessage(event.data))
    }
    port.start()
}
