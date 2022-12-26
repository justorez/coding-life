export let counter = 3
export function incCounter() {
    counter++
}

export function getCounter() {
    return counter
}

export default {
    counter,
    incCounter,
    getCounter
}
