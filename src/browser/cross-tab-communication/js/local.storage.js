// Local Storage
;(function () {
    const $header = document.getElementById('js-header')
    const $container = document.getElementById('local-storage')
    const $input = $container.querySelector('input')
    const $btn = $container.querySelector('button')
    const $info = $container.querySelector('p')

    window.addEventListener('storage', function (e) {
        if (e.key === 'ctc-msg') {
            const data = JSON.parse(e.newValue)
            const text = '[receive] ' + data.msg + ' —— tab ' + data.from
            console.log('[Storage] receive message:', text)
            $info.textContent = text
        }
    })

    on($input, $btn, function () {
        const tab = $header.dataset.tab
        const val = $input.value
        $input.value = ''
        $info.textContent = '[send] ' + val

        // must have some differences to fire 'storage' event
        // so use timestamp
        localStorage.setItem(
            'ctc-msg',
            JSON.stringify({
                from: tab,
                msg: val,
                t: Date.now()
            })
        )
    })
})()
