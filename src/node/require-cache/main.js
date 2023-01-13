// nodejs require cache
const lib = require('./lib')
console.log(lib.name) // lib

lib.name = 'main'
console.log(lib.name) // main

const lib2 = require('./lib')
console.log(lib2.name) // main [cache]

// delete cache
delete require.cache[ require.resolve('./lib') ]
const lib3 = require('./lib')
console.log(lib3.name) // lib
