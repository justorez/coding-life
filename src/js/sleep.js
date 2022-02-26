function sleep(delay = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

module.exports = sleep
