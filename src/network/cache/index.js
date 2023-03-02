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

        /** 协商缓存 last-modified */
        // const modifiedSince = ctx.request.header['if-modified-since']
        // const fileStat = await getFileStat(filePath)
        // ctx.set('Cache-Control', 'no-cache')
        // // 比对时间，mtime 为文件最后修改时间
        // if (modifiedSince === fileStat.mtime.toUTCString()) {
        //     ctx.status = 304
        // } else {
        //     ctx.set('Last-Modified', fileStat.mtime.toUTCString())
        //     ctx.body = fileBuffer
        // }

        // no-cache 指令不会阻止响应的存储，而是阻止在没有重新验证的情况下重用响应
        // 如果你不希望将响应存储在任何缓存中，请使用 no-store
        ctx.set('Cache-Control', 'no-cache')
        const noneMatch = ctx.request.header['if-none-match']
        // 计算资源内容的 hash 值
        const hash = crypto.createHash('md5')
        hash.update(fileBuffer)
        const etag = `"${hash.digest('hex')}"`
        console.log(`[${url}]`, '[if-none-match etag]', noneMatch, etag)
        // 对比 hash 值
        if (noneMatch === etag || noneMatch === `W/${etag}` || `W/${noneMatch}` === etag) {
            ctx.status = 304
        } else {
            ctx.set('ETag', etag)
            ctx.body = fileBuffer
        }
    }
})

app.listen(port, () => {
    console.log(`Start at http://localhost:${port}`)
})
