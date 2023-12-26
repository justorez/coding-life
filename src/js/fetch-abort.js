const request = (() => {
    /** @type {AbortController[]} */
    const controllerMap = {}

    return async function (url, index) {
        if (!controllerMap[url]) {
            controllerMap[url] = new AbortController()
        }
        const controller = controllerMap[url]
        try {
            await fetch(url, { signal: controller.signal })
            console.log(index, 'Request successful')
            controller.abort()
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log(index, 'Request aborted')
            } else {
                console.error(index, 'Failed to request', error)
            }
        }
    }
})()

;[1, 2, 3, 4, 5].forEach((i) => {
    request('https://s11.ax1x.com/2023/02/27/pp9Tc2q.png', i)
})
