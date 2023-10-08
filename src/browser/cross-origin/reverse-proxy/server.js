const http = require('http')
const url = require('url')

const port = 2334

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return

    const parseUrl = url.parse(req.url)
    if (parseUrl.pathname === '/api/list') {
        const list = { msg: 'hello', datetime: new Date().toLocaleString() }
        // res.writeHead(200, { 'content-Type': 'text/html;charset=UTF-8' })
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(list))
    } else {
        res.setHeader('Content-Type', 'text/html;charset=UTF-8')
        res.write(`服务器运行在 http://localhost:${port}/`)
        res.end()
    }
})

server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}/`)
})
