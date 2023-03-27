function fizzbuzz(num) {
    return `${num % 3 ? '' : 'fizz'}${num % 5 ? '' : 'buzz'}` || num
}

console.log(fizzbuzz(3)) // fizz
console.log(fizzbuzz(5)) // buzz
console.log(fizzbuzz(15)) // fizzbuzz
console.log(fizzbuzz(7)) // 7
