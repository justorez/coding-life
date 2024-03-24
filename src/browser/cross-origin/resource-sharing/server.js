const { randomUUID } = require('crypto')
const http = require('http')
const { parse: parseURL } = require('url')

http.createServer((req, res) => {
    const url = parseURL(req.url)
    if (req.method === 'POST' && url.pathname === '/api/user') {
        const chunks = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
            const body = Buffer.concat(chunks).toString()
            const bodyType = req.headers['content-type']
            const params =
                bodyType === 'application/json' ? JSON.parse(body) : body
            const user = { id: randomUUID(), ...params }

            cors(res)
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(user))
        })
    } else if (req.method === 'OPTIONS') {
        cors(res)
        res.statusCode = 200
        res.end()
    } else {
        res.setHeader('Content-Type', 'text/html')
        res.write(`Server is running at http://localhost:${2333}/`)
        res.end()
    }
}).listen(2333)

/**
 * @param {http.ServerResponse} response
 */
function cors(response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    response.setHeader('Access-Control-Allow-Headers', '*')
    // response.setHeader('Access-Control-Max-Age', '600')
    // response.setHeader('Access-Control-Expose-Headers', 'Other-Header')
}
