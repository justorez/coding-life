const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const Router = require('@koa/router')
const { bodyParser } = require('@koa/bodyparser')
const auth = require('./auth')

const app = new Koa()
const router = new Router()
const resolve = (...args) => path.resolve(__dirname, ...args)

router
    .get('/', (ctx) => {
        ctx.type = 'html'
        ctx.body = fs.createReadStream(resolve('index.html'))
    })
    .post('/login', (ctx) => {
        console.log(ctx.request.body)
        const { username, password } = ctx.request.body
        if (username === 'leo' && password === '123') {
            ctx.body = {
                token: auth.generateToken({
                    userId: 1,
                    username
                })
            }
        } else {
            ctx.status = 401
            ctx.body = { message: 'Invalid credentials' }
        }
    })

// 验证 JWT 的中间件
const authenticate = async (ctx, next) => {
    const token = ctx.get('authorization')?.split(' ')[1]

    if (!token) {
        ctx.status = 401
        ctx.body = { message: 'No token provided' }
        return
    }

    try {
        const decoded = auth.verifyToken(token)
        ctx.state.user = decoded // 将解码后的用户信息添加到 context 状态中
        await next()
    } catch (error) {
        ctx.status = 401
        ctx.body = { message: 'Invalid token' }
    }
}

// 需要鉴权的路由
router.post('/user', authenticate, (ctx) => {
    ctx.body = {
        user: ctx.state.user
    }
})

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))
