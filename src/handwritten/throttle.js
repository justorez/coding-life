/**
 * 节流函数，返回函数连续调⽤时，func 执⾏频率限定为 次 / wait
 * @param {Function} func 回调函数
 * @param {Number} wait 时间窗口的间隔
 * @param {Object} options 如果想忽略开始函数的的调⽤，传⼊ {leading:false}。
 *                         如果想忽略结尾函数的调⽤，传⼊ {trailing:false}。
 *                         两者不能共存，否则函数不能执⾏
 * @returns {Function} 返回客户调用函数
 */
function throttle(func, wait, options) {
    let context, args, result
    let timer = null
    let previous = 0 // 之前的时间戳
    let { leading, trailing } = options || {}
    leading = typeof leading === 'boolean' ? leading : true
    trailing = typeof trailing === 'boolean' ? trailing : true

    // 定时器回调函数
    let later = function() {
        // 如果设置了 leading，就将 previous 设为 0
        previous = !leading ? 0 : Date.now()
        timer = null
        result = func.apply(context, args)
        if (!timer) {
            context = args = null
        }
    }

    let throttled = function(..._args) {
        context = this
        args = _args
        
        let now = Date.now()
        if (!previous && !leading) {
            previous = now
        }
        let remaining = wait - (now - previous)
        
        // 如果当前调用已经大于上次调用时间 + wait
        // 如果设置了 trailing，只会进入这个条件
        // 如果设置了 leading，那么第一次会进入这个条件
        if (remaining <= 0 || remaining > wait) {
            // 如果存在定时器就清理掉否则会调用两次
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            result = func.apply(context, args)
            if (!timer) {
                context = args = null
            }
        } else if (!timer && trailing) {
            // 判断是否设置了定时器和 trailing
            // 没有的话就开启一个定时器
            timer = setTimeout(later, remaining)
        }
        return result
    }

    throttled.cancel = function() {
        clearTimeout(timer)
        previous = 0
        timer = context = args = null
    }

    return throttled
}
