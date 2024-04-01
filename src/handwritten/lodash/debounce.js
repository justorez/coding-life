/**
 * 防抖函数，返回函数连续调⽤时，空闲时间必须⼤于或等于 wait，fn 才会执⾏
 *
 * 主要用于在一系列密集的事件调用之后仅执行一次回调。
 *
 * 应用场景：
 * - 搜索框实时搜索：当用户在搜索框中连续快速输入字符时，每次输入都会触发搜索请求，
 *   这会导致大量不必要的网络请求。通过防抖，可以在用户停止输入一段时间后再执行搜索操作，
 *   通常是在最后一次输入后的指定间隔（如300毫秒）后触发。
 * - 窗口大小调整时重新计算布局：当用户调整浏览器窗口大小时，resize事件会非常频繁地触发。
 *   如果不加限制，每次窗口尺寸变化都会导致重新计算布局，这可能会造成性能瓶颈。
 *   应用防抖，可以确保只有在窗口大小稳定不变一段时间后才执行布局重算。
 *
 * @param {Function} func 回调函数
 * @param {Number} wait 表示时间窗⼝的间隔
 * @param {Boolean} immediate 设置为 ture 时，是否⽴即调⽤函数
 */
function debounce(func, wait, immediate) {
    let timer, context, args, result

    // 延迟执⾏函数
    const later = () =>
        setTimeout(() => {
            // 延迟函数执⾏完毕，清空缓存的定时器序号
            timer = null
            // 延迟执⾏的情况下，函数会在延迟函数中执⾏
            // 使⽤到之前缓存的参数和上下⽂
            if (!immediate) {
                result = func.apply(context, args)
                context = args = null
            }
        }, wait)

    let debounced = function (...params) {
        // 如果没有创建延迟执⾏函数（later），就创建⼀个
        if (!timer) {
            timer = later()
            // 如果是⽴即执⾏，调⽤函数
            // 否则缓存参数和调⽤上下⽂
            if (immediate) {
                result = func.apply(this, params)
            } else {
                context = this
                args = params
            }
        } else {
            clearTimeout(timer)
            timer = later()
        }

        return result
    }

    debounced.cancel = function () {
        clearTimeout(timer)
        timer = context = args = null
    }

    return debounced
}

// 简易版
function simple(func, wait) {
    let timer
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
