const http = require('http')
const fs = require('fs-extra')
const path = require('path')

http.createServer((_, res) => {
    fs.createReadStream(path.resolve(__dirname, 'parent.html')).pipe(res)
}).listen(2333, () => {
    console.log('http://127.0.0.1:2333')
})

http.createServer((_, res) => {
    fs.createReadStream(path.resolve(__dirname, 'child.html')).pipe(res)
}).listen(2334, () => {
    console.log('http://127.0.0.1:2334')
})
