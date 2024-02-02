const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const static = require('koa-static')

function sleep(time) {
    return new Promise(function (res) {
        setTimeout(() => {
            res()
        }, time)
    })
}

const app = new Koa()

app.use(static(__dirname + '/static/html'))
app.use(async (ctx) => {
    let { url } = ctx.request
    url = url.replace(/\?.*/, '')
    const _timeArr = url.match(/sleep(\d+)(?=-)/)
    let time = null
    if (_timeArr) {
        url = url.replace(/sleep\d+-/, '')
        time = _timeArr[1]
    }
    if (/css/.test(url)) {
        ctx.response.set('Content-Type', 'text/css')
    }
    if (time) {
        await sleep(time)
    }
    // ctx.body = fs.readFileSync(path.join(__dirname, 'static', url))
    ctx.body = fs.createReadStream(path.join(__dirname, 'static', url))
})

app.listen(3000, () => {
    console.log(`示例1：CSS 不阻塞 DOM 解析 http://localhost:3000/1.html`)
    console.log(`示例2：CSS 阻塞 DOM 渲染 http://localhost:3000/2.html`)
    console.log(`示例3：JS 阻塞 DOM 解析 http://localhost:3000/3.html`)
    console.log(`示例4：<script> 会触发页面渲染 http://localhost:3000/4.html`)
    console.log(
        `示例5：空 <script> 不会触发页面渲染 http://localhost:3000/5.html`
    )
})
