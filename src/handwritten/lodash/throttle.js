/**
 * 节流函数，返回函数连续调⽤时，func 执⾏频率限定为 次 / wait
 *
 * 确保在一段连续的时间段内，回调函数以固定的频率执行。
 *
 * 应用场景：
 * - 滚动事件监听：在网页或长列表滚动过程中，scroll事件会高频触发。
 *   如果不做处理，每次滚动都将触发相应的函数执行，可能导致页面卡顿或响应慢。
 *   通过节流，我们可以确保无论滚动多快，函数在一定时间内（比如每100毫秒）只会被执行一次，
 *   这样既能够及时更新界面状态，又不至于过于频繁。
 * - 地图拖拽实时更新标记位置：在地图应用中，用户拖拽地图时可能产生连续的mousemove或touchmove事件。
 *   为了实时显示当前位置但又不过度消耗资源，可以使用节流策略，
 *   在用户拖动过程中的每隔固定时间段更新一次标记位置，而不是对每一次微小的位置变化都做出响应。
 *
 * @param {Function} func 回调函数
 * @param {Number} wait 时间窗口的间隔
 * @param {Object} options 如果想忽略开始函数的的调⽤，传⼊ `{leading:false}`。
 *                         如果想忽略结尾函数的调⽤，传⼊ `{trailing:false}`。
 *                         两者不能共存，否则函数不能执⾏
 */
function throttle(func, wait, options) {
    let context, args, result
    let timer = null
    let previous = 0 // 之前的时间戳
    let { leading, trailing } = options || {}
    leading = typeof leading === 'boolean' ? leading : true
    trailing = typeof trailing === 'boolean' ? trailing : true

    // 定时器回调函数
    let later = function () {
        previous = !leading ? 0 : Date.now()
        timer = null
        result = func.apply(context, args)
        if (!timer) {
            context = args = null
        }
    }

    let throttled = function (..._args) {
        context = this
        args = _args

        let now = Date.now()
        if (!previous && !leading) {
            previous = now
        }
        let remaining = wait - (now - previous)

        // 如果没有剩余的时间了或者你改了系统时间
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

    throttled.cancel = function () {
        clearTimeout(timer)
        previous = 0
        timer = context = args = null
    }

    return throttled
}

// 简易版
function simple(func, wait) {
    let flag
    return function (...args) {
        if (flag) return
        flag = true
        setTimeout(() => {
            flag = false
            func.apply(this, args)
        }, wait)
    }
}
