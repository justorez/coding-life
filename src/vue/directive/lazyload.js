/**
 * 懒加载
 */
const directive = {
    mounted(el) {
        createObserver(el)

        function createObserver() {
            $class(el).add('loading')
            el.src = 'http://hilongjw.github.io/vue-lazyload/dist/loading-spin.svg'
        
            const options = {
                root: null,
                threshold: '0'
            }
            const observer = new IntersectionObserver(handleIntersect, options)
            observer.observe(el) // 订阅观察当前绑定图片元素
        }
        
        function handleIntersect(entries, observer) {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return
                } else {
                    // 绑定元素进入视口后触发加载图片
                    loadImage()
                    // 并停止观察可见性变化, 防止再次加载图像。
                    observer.unobserve(el)
                }
            })
        }
        
        function loadImage() {
            el.addEventListener('load', () => {
                $class(el).remove('loading').add('loaded')
            })
            el.addEventListener('error', () => {
                $class(el).remove('loading').add('error')
            })
            // 加载 data-src 的图片地址
            el.src = el.dataset.src
        }
    }
}

/**
 * 加载完成后延迟添加 class 可以实现淡入动画
 * @param {HTMLElement} el 
 * @param {String} className 
 */
function $class(el) {
    return new function () {
        this.add = (className) => el.classList.add(className) || this
        this.remove = (className) => el.classList.remove(className) || this
    }
}

export default {
    install(app) {
        app.directive('lazyload', directive)
    }
}
