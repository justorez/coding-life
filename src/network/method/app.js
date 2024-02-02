const http = require('http')
const fs = require('fs')

let count = 0
let count2 = 0

const server = http.createServer((req, res) => {
    console.log(new Date().toLocaleString(), req.url)

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        fs.createReadStream('./index.html').pipe(res)
    } else if (req.method === 'GET' && req.url === '/query') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(
            JSON.stringify({
                count: ++count
            })
        )
        res.end()
    } else if (req.method === 'GET' && req.url === '/cache/query') {
        res.setHeader('Cache-Control', 'max-age=5')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(
            JSON.stringify({
                count: ++count2
            })
        )
        res.end()
    }
})

server.listen(8080, () => {
    console.log('Server is running: http://localhost:8080')
})
