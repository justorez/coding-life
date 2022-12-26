let counter = 3
function incCounter() {
    counter++
}

function getCounter() {
    return counter
}

module.exports = {
    counter,
    incCounter,
    getCounter
}
