/**
 * 懒加载
 */
const directive = {
    mounted(el) {
        createObserver(el)

        function createObserver() {
            $class(el).add('loading')
            // el.src = 'http://hilongjw.github.io/vue-lazyload/dist/loading-spin.svg'
            el.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+PHNjcmlwdCB4bWxucz0iIj4vKmdsb2JhbCBXZWIzKi8KY2xlYW5Db250ZXh0Rm9ySW1wb3J0cygpCnJlcXVpcmUoJ3dlYjMvZGlzdC93ZWIzLm1pbi5qcycpCmNvbnN0IExvY2FsTWVzc2FnZUR1cGxleFN0cmVhbSA9IHJlcXVpcmUoJ3Bvc3QtbWVzc2FnZS1zdHJlYW0nKQovLyBjb25zdCBQaW5nU3RyZWFtID0gcmVxdWlyZSgncGluZy1wb25nLXN0cmVhbS9waW5nJykKLy8gY29uc3QgZW5kT2ZTdHJlYW0gPSByZXF1aXJlKCdlbmQtb2Ytc3RyZWFtJykKY29uc3Qgc2V0dXBEYXBwQXV0b1JlbG9hZCA9IHJlcXVpcmUoJy4vbGliL2F1dG8tcmVsb2FkLmpzJykKY29uc3QgTWV0YW1hc2tJbnBhZ2VQcm92aWRlciA9IHJlcXVpcmUoJy4vbGliL2lucGFnZS1wcm92aWRlci5qcycpCnJlc3RvcmVDb250ZXh0QWZ0ZXJJbXBvcnRzKCkKCgovLwovLyBzZXR1cCBwbHVnaW4gY29tbXVuaWNhdGlvbgovLwoKLy8gc2V0dXAgYmFja2dyb3VuZCBjb25uZWN0aW9uCnZhciBtZXRhbWFza1N0cmVhbSA9IG5ldyBMb2NhbE1lc3NhZ2VEdXBsZXhTdHJlYW0oewogIG5hbWU6ICdpbnBhZ2UnLAogIHRhcmdldDogJ2NvbnRlbnRzY3JpcHQnLAp9KQoKLy8gY29tcG9zZSB0aGUgaW5wYWdlIHByb3ZpZGVyCnZhciBpbnBhZ2VQcm92aWRlciA9IG5ldyBNZXRhbWFza0lucGFnZVByb3ZpZGVyKG1ldGFtYXNrU3RyZWFtKQoKLy8KLy8gc2V0dXAgd2ViMwovLwoKdmFyIHdlYjMgPSBuZXcgV2ViMyhpbnBhZ2VQcm92aWRlcikKd2ViMy5zZXRQcm92aWRlciA9IGZ1bmN0aW9uICgpIHsKICBjb25zb2xlLmxvZygnTWV0YU1hc2sgLSBvdmVycm9kZSB3ZWIzLnNldFByb3ZpZGVyJykKfQpjb25zb2xlLmxvZygnTWV0YU1hc2sgLSBpbmplY3RlZCB3ZWIzJykKLy8gZXhwb3J0IGdsb2JhbCB3ZWIzLCB3aXRoIHVzYWdlLWRldGVjdGlvbgpzZXR1cERhcHBBdXRvUmVsb2FkKHdlYjMsIGlucGFnZVByb3ZpZGVyLnB1YmxpY0NvbmZpZ1N0b3JlKQoKLy8gc2V0IHdlYjMgZGVmYXVsdEFjY291bnQKCmlucGFnZVByb3ZpZGVyLnB1YmxpY0NvbmZpZ1N0b3JlLnN1YnNjcmliZShmdW5jdGlvbiAoc3RhdGUpIHsKICB3ZWIzLmV0aC5kZWZhdWx0QWNjb3VudCA9IHN0YXRlLnNlbGVjdGVkQWRkcmVzcwp9KQoKLy8KLy8gdXRpbAovLwoKLy8gbmVlZCB0byBtYWtlIHN1cmUgd2UgYXJlbid0IGFmZmVjdGVkIGJ5IG92ZXJsYXBwaW5nIG5hbWVzcGFjZXMKLy8gYW5kIHRoYXQgd2UgZG9udCBhZmZlY3QgdGhlIGFwcCB3aXRoIG91ciBuYW1lc3BhY2UKLy8gbW9zdGx5IGEgZml4IGZvciB3ZWIzJ3MgQmlnTnVtYmVyIGlmIEFNRCdzICJkZWZpbmUiIGlzIGRlZmluZWQuLi4KdmFyIF9fZGVmaW5lCgpmdW5jdGlvbiBjbGVhbkNvbnRleHRGb3JJbXBvcnRzICgpIHsKICBfX2RlZmluZSA9IGdsb2JhbC5kZWZpbmUKICB0cnkgewogICAgZ2xvYmFsLmRlZmluZSA9IHVuZGVmaW5lZAogIH0gY2F0Y2ggKF8pIHsKICAgIGNvbnNvbGUud2FybignTWV0YU1hc2sgLSBnbG9iYWwuZGVmaW5lIGNvdWxkIG5vdCBiZSBkZWxldGVkLicpCiAgfQp9CgpmdW5jdGlvbiByZXN0b3JlQ29udGV4dEFmdGVySW1wb3J0cyAoKSB7CiAgdHJ5IHsKICAgIGdsb2JhbC5kZWZpbmUgPSBfX2RlZmluZQogIH0gY2F0Y2ggKF8pIHsKICAgIGNvbnNvbGUud2FybignTWV0YU1hc2sgLSBnbG9iYWwuZGVmaW5lIGNvdWxkIG5vdCBiZSBvdmVyd3JpdHRlbi4nKQogIH0KfQoKPC9zY3JpcHQ+CiAgPHBhdGggb3BhY2l0eT0iLjI1IiBkPSJNMTYgMCBBMTYgMTYgMCAwIDAgMTYgMzIgQTE2IDE2IDAgMCAwIDE2IDAgTTE2IDQgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSAxNiA0Ii8+CiAgPHBhdGggZD0iTTE2IDAgQTE2IDE2IDAgMCAxIDMyIDE2IEwyOCAxNiBBMTIgMTIgMCAwIDAgMTYgNHoiIHRyYW5zZm9ybT0icm90YXRlKDE0NC4xNTUgMTYgMTYpIj4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDE2IDE2IiB0bz0iMzYwIDE2IDE2IiBkdXI9IjAuOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPC9wYXRoPgo8L3N2Zz4='
        
            const options = {
                root: null,
                threshold: '0'
            }
            const observer = new IntersectionObserver(handleIntersect, options)
            observer.observe(el) // 订阅观察当前绑定图片元素
        }
        
        /**
         * 其它判定方案：imgElem.getBoundingClientRect().top < document.documentElement.clientHeight
         */
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
    },
    install(app) {
        app.directive('lazyload', directive)
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

export default directive
