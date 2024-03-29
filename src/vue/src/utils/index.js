export function randomColor() {
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
}

export default {
    randomColor,
    install(app) {
        app.config.globalProperties.utils = this
    }
}
