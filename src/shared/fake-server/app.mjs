import { createServer } from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 一个用于测试的 HTTP 服务
 * - /up/<file.mp4> 二进制文件流上传接口
 */
const server = createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
        return
    }

    res.setHeader('access-control-allow-origin', '*')
    res.setHeader('access-control-allow-headers', '*')
    res.setHeader('access-control-allow-methods', '*')

    if (req.url.includes('/up')) {
        const filename = decodeURIComponent(path.parse(req.url).base)
        const savePath = path.join(__dirname, '../temp', filename)
        req.pipe(fs.createWriteStream(savePath))
        req.on('end', () => {
            res.end('File uploaded successfully')
        })
        return
    }

    res.writeHead(400)
    res.end('Invalid request')
})

server.listen(3333, () => {
    console.log('Server running on http://localhost:3333')
})
