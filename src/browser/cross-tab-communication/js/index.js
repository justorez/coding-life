let title = ''
const $header = document.getElementById('js-header')
if (/new/.test(document.location.search)) {
    let num = Number(localStorage.getItem('count')) + 1
    title = `No.${num} - A New Tab (Cross Tab Communication)`
    localStorage.setItem('count', num)
    $header.dataset.tab = num
    document.title = title
} else {
    title = 'Cross Tab Communication'
    localStorage.setItem('count', 1)
    $header.dataset.tab = 1
}
$header.textContent = title

/**
 * Listen enter input and click button
 * @param {HTMLHtmlElement} input
 * @param {HTMLHtmlElement} btn
 * @param {Function} f
 */
function on(input, btn, f) {
    input.onkeyup = (e) => e.key.toLowerCase() === 'enter' && f()
    btn.onclick = f
}
