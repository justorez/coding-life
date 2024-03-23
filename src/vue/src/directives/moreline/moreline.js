const directive = {
    mounted(el, binding) {
        const maxRow = binding.value
        let row = getRowCount(el)
        if (row <= maxRow) {
            return
        }

        let rawContent = el.innerText
        let newContent = el.innerText

        // 循环删除文本内容的最后一个字符，并与预设的行数比对
        // 直到找到符合条件的字符串
        while (row > maxRow) {
            newContent = newContent.slice(0, -1)
            el.innerText = newContent + '...查看更多'
            row = getRowCount2(el)
        }
        newContent += '...'

        let btn = document.createElement('a')
        btn.classList.add('btn-moreline')
        btn.href = 'javascript:void(0)'
        btn.dataset.open = 'false'
        btn.innerText = '查看更多'
        btn.onclick = () => {
            btn.remove()
            let state = btn.dataset.open
            if (state === 'false') {
                btn.innerText = '收起'
                btn.dataset.open = 'true'
                el.innerText = rawContent
            } else {
                btn.innerText = '查看更多'
                btn.dataset.open = 'false'
                el.innerText = newContent
            }
            el.appendChild(btn)
        }
        el.innerText = newContent
        el.appendChild(btn)
    },
    install(app) {
        app.directive('moreline', directive)
    }
}

function getRowCount(el) {
    let lineNode = el.cloneNode()
    lineNode.innerHTML = el.innerHTML
    lineNode.style.cssText += `visibility:hidden;white-space:nowrap;margin:0;padding:0`
    document.body.appendChild(lineNode)

    // 获取行高
    let style = window.getComputedStyle(lineNode)
    let lineHeight =
        style.lineHeight === 'normal' ? lineNode.offsetHeight : style.lineHeight
    if (typeof lineHeight === 'string') {
        lineHeight = Number(lineHeight.replace('px', ''))
    }

    // 获取行数
    let row = el.offsetHeight / lineHeight
    lineNode.remove()
    return row
}

// 仅针对行内元素 display:inline
function getRowCount2(el) {
    let rects = el.getClientRects()
    let row = 0,
        lastBottom = 0
    for (const rect of rects) {
        if (rect.bottom === lastBottom) {
            continue
        }
        lastBottom = rect.bottom
        row++
    }
    // console.log(rects.length, row)
    return row
}

export default directive
