// Service Worker
;(function () {
    const $header = document.getElementById('js-header')
    const $container = document.getElementById('service-worker')
    const $input = $container.querySelector('input')
    const $btn = $container.querySelector('button')
    const $info = $container.querySelector('p')

    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('./worker/sw.js').then(function () {
            console.log('Service worker register successfully')
        })
        navigator.serviceWorker.addEventListener('message', function (e) {
            const data = e.data
            if ($header.dataset.tab === data.from) {
                return
            }
            const text = '[receive] ' + data.msg + ' —— tab ' + data.from
            console.log('[Service Worker] receive message:', text)
            $info.textContent = text
        })
    }

    on($input, $btn, function () {
        const tab = $header.dataset.tab
        const val = $input.value
        $input.value = ''
        $info.textContent = '[send] ' + val
        navigator.serviceWorker.controller.postMessage({
            from: tab,
            msg: val
        })
    })
})()
