const http = require('http')

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const callback = url.searchParams.get('callback')
    const info = JSON.stringify({
        username: 'leo',
        age: 18
    })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(`${callback}(${info})`)
})

const port = 2333
server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}/`)
})
