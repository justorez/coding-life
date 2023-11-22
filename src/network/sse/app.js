const http = require('http')

http.createServer((req, res) => {
    const fileName = '.' + req.url
    const now = () => new Date().toLocaleString()

    if (fileName === './stream') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        })
        // [field]: value\n
        res.write('retry: 10000\n') // 重连时间间隔
        res.write('event: foo\n') // 自定义事件
        res.write('data: ' + now() + '\n\n') // 数据
        res.write('data: ' + now() + '\n\n')

        interval = setInterval(() => {
            res.write('data: ' + now() + '\n\n')
        }, 1000)

        req.addListener('close', () => {
            console.log('sse closed.')
            clearInterval(interval)
        })
    }
}).listen(8848, () => {
    console.log('http://localhost:8848')
})
