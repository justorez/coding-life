/**
 * input 长度限制，中文字符算两个
 * 超出限制无法输入
 */
const directive = {
    mounted(el, binding) {
        // 兼容组件库：input 不一定是根元素
        el = el.nodeName !== 'INPUT' ? el.querySelector('input') : el
        if (!el) {
            return
        }

        let flag = false
        el.addEventListener('compositionstart', () => {
            flag = true
        })
        el.addEventListener('compositionend', () => {
            flag = false
        })

        const maxlen = Number(binding.value)
        el.addEventListener('keyup', () => {
            if (flag) {
                return // 正在输入中文
            }

            let str = el.value
            let oldStr = el.value
            let end = getEndIndex(str, maxlen) + 1
            el.value = str.slice(0, end)

            // 值发生变化才派发事件
            if (oldStr !== el.value) {
                el.dispatchEvent(new UIEvent('input'))
            }
        })
    }
}

// 获取需要截断的末尾索引
function getEndIndex(str, maxlen) {
    let len = 0
    let end = 0
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127) {
            len += 2
        } else {
            len += 1
        }

        if (len > maxlen) {
            end = i - 1
            break
        }
        end = i
    }
    return end < 0 ? 0 : end
}

export default {
    install(app) {
        app.directive('maxlength', directive)
    }
}
