import { defineConfig } from 'rollup'
import fs from 'fs-extra'

const pkg = fs.readJSONSync('./package.json')

const myplugin = () => {
    return {
        name: 'myplugin',
        resolveId(source) {
            console.log(source) // 'index.mjs', './utils.mjs', ...
            if (source === 'random') {
                return source
            }
            return null
        },
        load(id) {
            if (id === 'random') {
                return `export default { int(){ return 233 } } `
            }
        }
    }
}

export default defineConfig({
    input: 'index.mjs',
    output: [
        { dir: 'dist', format: 'es', entryFileNames: '[name].mjs' },
        { dir: 'dist', format: 'cjs', entryFileNames: '[name].cjs' }
    ],
    plugins: [myplugin()]
})
