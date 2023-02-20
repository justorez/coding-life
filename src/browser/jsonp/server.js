const http = require('http')

const random = (min, max) => {
    return min + Math.round(Math.random() * (max - min))
}
const server = http.createServer((req, res) => {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`)
    const callback = searchParams.get('callback')
    const params = JSON.parse(searchParams.get('params'))
    const info = JSON.stringify({
        username: 'leo',
        age: params.age + 1
    })
    res.statusCode = random(0, 1) ? 200 : 500
    res.setHeader('Content-Type', 'application/json')
    res.end(`${callback}(${info})`)
})

const port = 2333
server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}/`)
})
