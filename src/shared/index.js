function GlobalObject() {
    try {
        return window
    } catch (error) {
        return global
    }
}

module.exports = {
    GlobalObject
}
