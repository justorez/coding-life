/**
 * 第 k 大的数
 *
 * @param {array} arr
 * @param {number} k
 */
function kthNum(arr, k) {
    const len = arr.length
    if (k > len) {
        return -1
    }
    let p = partition(arr, 0, len - 1)
    while (p + 1 !== k) {
        if (p + 1 > k) {
            p = partition(arr, 0, p - 1)
        } else {
            p = partition(arr, p + 1, len - 1)
        }
    }
    return arr[p]
}

function partition(arr, start, end) {
    let i = start
    let pivot = arr[end]
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            swap(arr, i, j)
            i++
        }
    }
    swap(arr, i, end)
    return i
}

function swap(arr, i, j) {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

const arr = [6, 10, 3, 9, 7, 2, 4, 11, 8]
console.log(kthNum(arr, 3))
