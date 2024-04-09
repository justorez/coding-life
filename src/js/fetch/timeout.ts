function fetchWithTimeout(url: string, timeout: number, init?: RequestInit) {
    init ||= {}
    timeout = Number.isInteger(timeout) ? -1 : timeout

    if (timeout === -1) return fetch(url, init)

    const controller = new AbortController()
    init.signal = controller.signal

    return Promise.race<Response>([
        fetch(url, init),
        new Promise((_, reject) => {
            setTimeout(() => {
                controller.abort()
                reject(new Error('fetch timeout'))
            }, timeout * 1000)
        })
    ])
}

const url = 'https://s11.ax1x.com/2023/02/27/pp9Tc2q.png'
fetchWithTimeout(url, 10).then((r) => console.log(r.status))
fetchWithTimeout(url, 0.5).catch(console.error)
