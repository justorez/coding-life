/**
 * 防抖函数，返回函数连续调⽤时，空闲时间必须⼤于或等于 wait，fn 才会执⾏
 * @param {Function} func 回调函数
 * @param {Number} wait 表示时间窗⼝的间隔
 * @param {Boolean} immediate 设置为 ture 时，是否⽴即调⽤函数
 * @return {Function} 返回客户调⽤函数
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
