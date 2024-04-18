const { lib } = require('./lib.cjs')

console.log(lib)

exports.main = 'main'

// main.cjs requires lib.cjs
// As require is synchronous, it blocks the export of main.cjs
// As a result, main is undefined in lib.cjs
