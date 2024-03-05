const { randomUUID } = require('crypto')
const http = require('http')

http.createServer((req, res) => {
    const fileName = '.' + req.url
    const random = () =>
        String(Math.floor(Math.random() * 100)).padStart(2, '0')
    const now = () => new Date().toLocaleString()

    if (fileName === './stream') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        })

        // [field]: value\n
        res.write('retry: 10000\n') // 重连时间间隔
        res.write(`id: ${randomUUID()}\n`) // 浏览器通过 lastEventId 读取
        res.write('event: foo\n') // 自定义事件
        res.write(`data: ${now()}\n\n`) // 事件 foo 的数据

        res.write(`id: ${randomUUID()}\n`)
        res.write(`data: ${now()}\n\n`) // 触发默认事件 message

        interval = setInterval(() => {
            // 如果一条数据很长，可以分成多行，最后一行用 \n\n 结尾，前面行都用 \n 结尾
            res.write(`id: ${randomUUID()}\n`)
            res.write(`data: ${random()}\n`)
            res.write(`data: ${now()}\n\n`)
        }, 1000)

        req.addListener('close', () => {
            console.log('sse closed.')
            clearInterval(interval)
        })
    }
}).listen(8848, () => {
    console.log('http://localhost:8848')
})
