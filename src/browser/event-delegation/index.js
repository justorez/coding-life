/**
 * 事件委托
 * @param {HTMLElement} element 
 * @param {String} eventType 
 * @param {String} selector 
 * @param {Function} callback 
 * @returns 
 */
function delegate(element, eventType, selector, callback) {
    element.addEventListener(eventType, (event) => {
        // Event.target 事件触发的元素
        // Event.currentTarget 事件绑定的元素
        let el = event.target
        while (!el.matches(selector)) {
            if (element === el) {
                el = null
                break
            }
            el = el.parentNode
        }
        el && callback.call(el, event, el)
    })
    return element
}
