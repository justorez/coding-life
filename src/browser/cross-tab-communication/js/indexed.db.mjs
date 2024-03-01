// Storage: Indexed DB
import { openStore, saveData, query } from './db.mjs'

const $header = document.getElementById('js-header')
const $container = document.getElementById('storage2')
const $input = $container.querySelector('input')
const $btn = $container.querySelector('button')
const $info = $container.querySelector('p')

const db = await openStore()
saveData(db, null)

$input.disabled = false
$btn.disabled = false
$container.classList.remove('disabled')

// 轮询新消息
const timer = setInterval(async () => {
    try {
        const res = await query(db)
        if (!res || !res.data || $header.dataset.tab === res.data.from) {
            return
        }
        const data = res.data
        const text = '[receive] ' + data.msg + ' —— tab ' + data.from
        console.log('[IndexedDB] receive message:', text)
        $info.textContent = text
    } catch (error) {
        console.error(error)
        clearInterval(timer)
    }
}, 1000)

on($input, $btn, function () {
    const tab = $header.dataset.tab
    const val = $input.value
    $input.value = ''
    $info.textContent = '[send] ' + val
    saveData(db, {
        from: tab,
        msg: val
    })
})
