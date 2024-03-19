export default {
    randomColor() {
        var r = Math.floor(Math.random() * 256)
        var g = Math.floor(Math.random() * 256)
        var b = Math.floor(Math.random() * 256)
        return `rgb(${r},${g},${b})`
    },
    install(app) {
        app.config.globalProperties.utils = this
    }
}
