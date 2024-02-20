// BroadcastChannel
;(function () {
    const bc = new BroadcastChannel('Justorez')
    const $header = document.getElementById('js-header')
    const $container = document.getElementById('broadcast-channel')
    const $input = $container.querySelector('input')
    const $btn = $container.querySelector('button')
    const $info = $container.querySelector('p')

    bc.onmessage = function (e) {
        const data = e.data
        const text = '[receive] ' + data.msg + ' —— tab ' + data.from
        console.log('[BroadcastChannel] receive message:', text)
        $info.textContent = text
    }
    bc.onmessageerror = function (e) {
        console.error(e)
    }

    on($input, $btn, function () {
        const tab = $header.dataset.tab
        const val = $input.value
        $input.value = ''
        $info.textContent = '[send] ' + val
        bc.postMessage({
            from: tab,
            msg: val
        })
    })
})()
