const path = require('path')
const ZipPlugin = require('./plugin')

module.exports = {
    mode: 'production',
    entry: './src.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    plugins: [
        new ZipPlugin({
            filename: 'dist'
        })
    ]
}
