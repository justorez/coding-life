const request = (() => {
    const controllerMap = new Map<string, AbortController>()

    return async function (url: string, index: number) {
        let controller = controllerMap.get(url)
        if (!controller) {
            controller = new AbortController()
            controllerMap.set(url, controller)
        }
        try {
            await fetch(url, { signal: controller.signal })
            console.log(index, 'Request successful')
            controller.abort()
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                console.log(index, 'Request aborted')
            } else {
                console.error(index, 'Failed to request', error)
            }
        }
    }
})()

;[1, 2, 3].forEach((i) => {
    request('https://s11.ax1x.com/2023/02/27/pp9Tc2q.png', i)
})
