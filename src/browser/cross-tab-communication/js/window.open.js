// window.open
;(function () {
    const $header = document.getElementById('js-header')
    const $container = document.getElementById('post-message')
    const $title = $container.querySelector('h2')
    const $input = $container.querySelector('input')
    const $btn = $container.querySelector('button')
    const $info = $container.querySelector('p')

    let childWins = []
    if (childWins.length === 0 && !window.opener) {
        $input.disabled = true
        $btn.disabled = true
        $container.classList.add('disabled')
        $title.textContent = $title.textContent + ' (no open)'
    }

    document.getElementById('js-link').onclick = () => {
        const win = window.open('./?new=1')
        childWins.push(win)

        $input.disabled = false
        $btn.disabled = false
        $container.classList.remove('disabled')
        $title.textContent = $title.textContent.replace(' (no open)', '')
    }

    window.onmessage = (e) => {
        const data = e.data
        if ($header.dataset.tab === data.from) {
            return
        }
        const text = '[receive] ' + data.msg + ' —— tab ' + data.from
        console.log('[opener] receive message:', text)
        $info.textContent = text

        // don't send message back
        if (window.opener && !window.opener.closed && data.fromOpenner) {
            window.opener.postMessage(data) // send to parent
        }

        // release reference when window closed
        childWins = childWins.filter((w) => !w.closed)

        // don't send message back
        if (childWins && !data.fromOpenner) {
            childWins.forEach((w) => w.postMessage(data)) // send to children
        }
    }

    on($input, $btn, function () {
        const tab = $header.dataset.tab
        const val = $input.value
        $input.value = ''
        $info.textContent = '[send] ' + val

        // release reference when window closed
        childWins = childWins.filter((w) => !w.closed)

        // send message to childs
        childWins.forEach((w) =>
            w.postMessage({
                from: tab,
                msg: val,
                fromOpenner: false
            })
        )

        // send message to parent
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
                from: tab,
                msg: val,
                fromOpenner: true
            })
        }
    })
})()
