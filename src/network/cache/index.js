const Koa = require('koa')
const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const mime = require('mime-types')

const parseStatic = (dir) => fs.readFile(dir)
const getFileStat = (path) => fs.stat(path)
const now = () => new Date().toLocaleTimeString()

const app = new Koa()
const port = 9898

app.use(async (ctx) => {
    const url = ctx.path
    const cacheType = ctx.query.c

    if (url === '/') {
        // 访问根路径返回 index.html
        ctx.set('Content-Type', 'text/html')
        ctx.body = await parseStatic('./index.html')
    } else {
        const filePath = path.resolve(__dirname, `.${url}`)
        const fileBuffer = await parseStatic(filePath)
        ctx.set('Content-Type', mime.lookup(url)) // 设置类型

        // 强缓存
        if (cacheType === 'age') {
            console.log(now(), '[新请求]', url)
            // 设置 Expires 响应头
            const date = new Date(Date.now() + 3000).toUTCString() // 3s
            ctx.set('Expires', date)
            // 设置 Cache-Control 响应头，单位：秒
            // max-age 优先级高于 expires
            ctx.set('Cache-Control', 'max-age=60') // 20s
            ctx.body = fileBuffer // 设置传输
            return
        }

        // 协商缓存 last-modified/if-modified-since
        if (cacheType === 'time') {
            const modifiedSince = ctx.get('if-modified-since')
            const fileStat = await getFileStat(filePath)
            ctx.set('Cache-Control', 'no-cache')
            // 比对时间，mtime 为文件最后修改时间
            if (modifiedSince === fileStat.mtime.toUTCString()) {
                console.log(now(), '[协商缓存]', url, modifiedSince)
                ctx.status = 304
            } else {
                console.log(now(), '[新请求]', url)
                ctx.set('Last-Modified', fileStat.mtime.toUTCString())
                ctx.body = fileBuffer
            }
            return
        }

        // 协商缓存 etag/if-none-match
        if (cacheType === 'hash' || !cacheType) {
            // no-cache 指令不会阻止响应的存储，而是阻止在没有重新验证的情况下重用响应
            // 如果你不希望将响应存储在任何缓存中，请使用 no-store
            ctx.set('Cache-Control', 'no-cache')
            const noneMatch = ctx.get('if-none-match')
            // 计算资源内容的 hash 值
            const hash = crypto.createHash('md5')
            hash.update(fileBuffer)
            const etag = `"${hash.digest('hex')}"`

            // 对比 hash 值
            if (
                noneMatch === etag ||
                noneMatch === `W/${etag}` ||
                `W/${noneMatch}` === etag
            ) {
                console.log(now(), '[协商缓存]', url, noneMatch, etag)
                ctx.status = 304
            } else {
                console.log(now(), '[新请求]', url)
                ctx.set('ETag', etag)
                ctx.body = fileBuffer
            }
            return
        }
    }
})

app.listen(port, () => {
    console.log(`Start at http://localhost:${port}`)
})
