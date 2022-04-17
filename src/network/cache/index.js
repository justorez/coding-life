const Koa = require('koa')
const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const mime = require('mime-types')

// 将文件转成传输所需格式
const parseStatic = (dir) => {
    return fs.readFile(dir)
}

// 获取文件信息
const getFileStat = (path) => {
    return fs.stat(path)
}

const app = new Koa()
const port = 9898

app.use(async (ctx) => {
    const url = ctx.request.url
    if (url === '/') {
        // 访问根路径返回 index.html
        ctx.set('Content-Type', 'text/html')
        ctx.body = await parseStatic('./index.html')
    } else {
        const filePath = path.resolve(__dirname, `.${url}`)
        const fileBuffer = await parseStatic(filePath)
        
        ctx.set('Content-Type', mime.lookup(url)) // 设置类型

        /** 强缓存 */
        // 设置 Expires 响应头
        // const time = new Date(Date.now() + 30000).toUTCString()
        // ctx.set('Expires', time)

        // 设置 Cache-Control 响应头，单位：秒
        // ctx.set('Cache-Control', 'max-age=30')

        // ctx.body = fileBuffer // 设置传输


        /** 协商缓存 */
        // const ifModifiedSince = ctx.request.header['if-modified-since']
        // const fileStat = await getFileStat(filePath)
        // ctx.set('Cache-Control', 'no-cache')
        // // 比对时间，mtime 为文件最后修改时间
        // if (ifModifiedSince === fileStat.mtime.toUTCString()) {
        //     ctx.status = 304
        // } else {
        //     ctx.set('Last-Modified', fileStat.mtime.toUTCString())
        //     ctx.body = fileBuffer
        // }

        const ifNoneMatch = ctx.request.header['if-none-match']
        console.log('if-none-match', ifNoneMatch)
        // 计算资源内容的 hash 值
        const hash = crypto.createHash('md5')
        hash.update(fileBuffer)
        const etag = `"${hash.digest('hex')}"`
        ctx.set('Cache-Control', 'no-cache')
        // 对比 hash 值
        if (ifNoneMatch === etag) {
            ctx.status = 304
        } else {
            ctx.set('etag', etag)
            ctx.body = fileBuffer
        }
    }
})

app.listen(port, () => {
    console.log(`Start at http://localhost:${port}`)
})
