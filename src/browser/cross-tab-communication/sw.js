self.addEventListener('activate', (event) => {
    // 当一个 service worker 被初始注册时，页面只有重新加载才会被控制
    // 使用 claim() 方法会立即控制这些页面
    event.waitUntil(clients.claim())
})

self.onmessage = (e) => {
    console.log('Service worker receive message', e.data)

    const forward = async () => {
        const clients = await self.clients.matchAll()
        console.log('Service worker clients:', clients)
        if (!clients || clients.length === 0) {
            return
        }
        clients.forEach((client) => {
            client.postMessage(e.data)
        })
    }

    e.waitUntil(forward())
}
