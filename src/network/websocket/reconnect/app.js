const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', function connection(ws) {
    ws.on('error', console.error)

    ws.on('message', function message(data) {
        const msg = data.toString()
        console.log('received:', msg)
        if (msg === 'cmd:close') {
            ws.close()
        }
    })
})
