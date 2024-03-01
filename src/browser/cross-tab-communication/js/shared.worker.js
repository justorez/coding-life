// Shared Worker
;(function () {
    if (!window.SharedWorker) return

    const $header = document.getElementById('js-header')
    const $container = document.getElementById('shared-worker')
    const $input = $container.querySelector('input')
    const $btn = $container.querySelector('button')
    const $info = $container.querySelector('p')

    const sharedWorker = new SharedWorker('js/sharedw.js', 'ctc')
    sharedWorker.port.onmessage = (e) => {
        const data = e.data
        if ($header.dataset.tab === data.from) {
            return
        }
        const text = '[receive] ' + data.msg + ' —— tab ' + data.from
        console.log('[Shared Worker] receive message:', text)
        $info.textContent = text
    }
    sharedWorker.port.onmessageerror = (e) => console.error(e)
    sharedWorker.port.start()

    on($input, $btn, function () {
        const tab = $header.dataset.tab
        const val = $input.value
        $input.value = ''
        $info.textContent = '[send] ' + val
        sharedWorker.port.postMessage({
            from: tab,
            msg: val
        })
    })
})()
