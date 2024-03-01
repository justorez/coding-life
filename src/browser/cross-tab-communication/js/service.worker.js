// Service Worker
;(async function () {
    if (!navigator.serviceWorker) {
        console.log('Service workers are not supported.')
        return
    }

    const $header = document.getElementById('js-header')
    const $container = document.getElementById('service-worker')
    const $input = $container.querySelector('input')
    const $btn = $container.querySelector('button')
    const $info = $container.querySelector('p')

    try {
        // 特别要注意 ServiceWorker 的作用域
        // ServiceWorker 只能控制 sw.js 同路径下的地址，
        // 比如 /js/sw.js，那么它只能控制 /js/ 下的地址
        // 想要扩大控制范围，只能通过 Service-Worker-Allowed 响应头
        const registration = await navigator.serviceWorker.register('sw.js')
        console.log('Service worker registration succeeded:', registration)

        navigator.serviceWorker.onmessage = (e) => {
            const data = e.data
            if ($header.dataset.tab === data.from) {
                return
            }
            const text = '[receive] ' + data.msg + ' —— tab ' + data.from
            console.log('[Service Worker] receive message:', text)
            $info.textContent = text
        }

        on($input, $btn, function () {
            const tab = $header.dataset.tab
            const val = $input.value
            $input.value = ''
            $info.textContent = '[send] ' + val
            // navigator.serviceWorker.controller
            registration.active.postMessage({
                from: tab,
                msg: val
            })
        })
    } catch (error) {
        console.error(`Service worker registration failed: ${error}`)
    }
})()
