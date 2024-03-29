import { ConfigEnv, UserConfig } from 'vite'
import { WebSocketServer, WebSocket } from 'ws'

/**
 * rollup watch 模式下，通知构建完成事件
 */
export default function () {
    let wss: WebSocketServer | null
    let ws: WebSocket | null
    let timer: NodeJS.Timeout

    const send = (msg: string) => {
        if (!ws) {
            return
        }
        msg = JSON.stringify(msg)
        // console.log('\n[notifier send]', msg)
        ws.send(msg)
    }

    const close = () => {
        ws && ws.close()
        wss && wss.close()
        clearTimeout(timer)
        ws = null
        wss = null
    }

    return {
        name: 'build-notifier',
        apply(config: UserConfig, { command }: ConfigEnv) {
            const canUse = command === 'build' && Boolean(config.build?.watch)
            if (canUse) {
                wss = new WebSocketServer({ port: 2333 })
                wss.on('connection', (client: WebSocket) => {
                    ws = client
                })
            }
            return canUse
        },
        closeBundle() {
            // console.log('\nclose bundle')
            timer = setTimeout(() => send('watch-build-ok'), 500)
        },
        watchChange() {
            clearTimeout(timer)
        },
        closeWatcher() {
            close()
        }
    }
}
