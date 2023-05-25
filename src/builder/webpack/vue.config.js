const path = require('path')
const ZipPlugin = require('zip-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const appName = 'dist'
const { NODE_ENV, VUE_APP_UIAP_HOST, VUE_APP_HOST, VUE_APP_DEBUGGER } = process.env
const debugging = VUE_APP_DEBUGGER !== 'true' && NODE_ENV === 'production'
const themeFilePath = path.join(__dirname, './src/styles/theme.less')

module.exports = {
    publicPath: './',
    assetsDir: '',
    outputDir: appName,
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        port: 5000, // 本地运行的端口号
        proxy: {
            '/app': {
                target: VUE_APP_HOST,
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/miniapp': {
                target: VUE_APP_HOST,
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/sdk': {
                target: VUE_APP_UIAP_HOST,
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        // 通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "${themeFilePath}";`
                    }
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new ZipPlugin({
                filename: `${appName}.zip`
            })
        ],
        optimization: {
            // if the environment is development then optimization.chunkIds is set to 'named', 
            // while in production it is set to 'deterministic'
            chunkIds: 'deterministic',
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: debugging ? {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        } : {}
                    }
                })
            ],
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: 6,
                cacheGroups: {
                    vendors: {
                        name: 'chunk-vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    vue: {
                        name: 'lib-vue',
                        test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
                        priority: 20
                    },
                    vant: {
                        name: 'lib-vant',
                        test: /[\\/]node_modules[\\/]vant[\\/]/,
                        priority: 20
                    },
                    eruda: {
                        name: 'lib-eruda',
                        test: /[\\/]node_modules[\\/]eruda[\\/]/,
                        priority: 20
                    },
                    vconsole: {
                        name: 'lib-vconsole',
                        test: /[\\/]node_modules[\\/]vconsole[\\/]/,
                        priority: 20
                    },
                    commons: {
                        name: `chunk-commons`,
                        minChunks: 2,
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
}
