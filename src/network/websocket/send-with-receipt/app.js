const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', function connection(ws) {
    ws.on('error', console.error)

    ws.on('message', function message(data) {
        console.log('received:', data.toString())
        const msg = JSON.parse(data.toString())
        if (msg.testError) {
            return
        }
        msg.datetime = new Date().toLocaleString()
        ws.send(JSON.stringify(msg))
    })
})
