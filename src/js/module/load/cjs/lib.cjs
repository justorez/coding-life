const { main } = require('./main.cjs')

setTimeout(() => console.log(main), 3000)

exports.lib = 'lib'
