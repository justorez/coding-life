const directive = {
    mounted(el, binding) {
        el.clickOutsideFunc = (event) => {
            const callback = binding.value
            if (typeof callback !== 'function') {
                return
            }
            if (!(event.target === el || el.contains(event.target))) {
                callback(event, el)
            }
        }
        document.addEventListener('click', el.clickOutsideFunc)
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideFunc)
    },
    install(app) {
        app.directive('clickOutside', directive)
    }
}

export default directive
