/**
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 */
function shuffle(arr) {
    arr = Array.from(arr)
    let lastIndex = arr.length
    while (lastIndex--) {
        let index = Math.floor(Math.random() * lastIndex)
        ;[arr[index], arr[lastIndex]] = [arr[lastIndex], arr[index]]
    }
    return arr
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(arr, shuffle(arr))
