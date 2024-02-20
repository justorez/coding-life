let title = ''
const $header = document.getElementById('js-header')
if (/new/.test(document.location.search)) {
    let num = Number(localStorage.getItem('count')) + 1
    title = 'No.' + num + ' - A New Tab (Cross Tab Communication)'
    localStorage.setItem('count', num)
    $header.setAttribute('data-tab', num)
    document.title = title
} else {
    title = 'Cross Tab Communication'
    localStorage.setItem('count', 1)
    $header.setAttribute('data-tab', 1)
}
$header.textContent = title

/**
 * @param {HTMLHtmlElement} input
 * @param {HTMLHtmlElement} btn
 * @param {Function} f
 */
function on(input, btn, f) {
    input.onkeyup = (e) => e.key.toLowerCase() === 'enter' && f()
    btn.onclick = f
}
