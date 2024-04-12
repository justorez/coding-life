const JSZip = require('jszip')
const { validate } = require('schema-utils')

// 选项对象的 schema
const schema = {
    type: 'object',
    properties: {
        filename: {
            type: 'string'
        }
    }
}

module.exports = class ZipPlugin {
    constructor(options) {
        validate(schema, options, {
            name: ZipPlugin.name,
            baseDataPath: 'options'
        })
        this.options = options
    }

    apply(compiler) {
        const pluginName = ZipPlugin.name

        // webpack 模块实例，可以通过 compiler 对象访问，
        // 这样确保使用的是模块的正确版本
        // （不要直接 require/import webpack）
        const { webpack } = compiler

        // Compilation 对象提供了对一些有用常量的访问。
        const { Compilation } = webpack

        // RawSource 是其中一种 “源码”("sources") 类型，
        // 用来在 compilation 中表示资源的源码
        const { RawSource } = webpack.sources

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tapAsync(
                {
                    name: pluginName,
                    // 用某个靠后的资源处理阶段，
                    // 确保所有资源已被插件添加到 compilation
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
                },
                (assets, callback) => {
                    const zip = new JSZip()
                    const folder = zip.folder(this.options.filename)

                    for (let filename in assets) {
                        const source = assets[filename].source()
                        folder.file(filename, source)
                    }

                    zip.generateAsync({
                        type: 'nodebuffer'
                    }).then((content) => {
                        // 向 compilation 添加新的资源，
                        // 这样 webpack 就会自动生成并输出到 output 目录
                        compilation.emitAsset(
                            this.options.filename + '.zip',
                            new RawSource(content)
                        )
                        callback()
                    })
                }
            )
        })
    }
}
