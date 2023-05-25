module.exports = {
    optimization: {
        emitOnErrors: !dev,
        checkWasmTypes: false,
        nodeEnv: false,
        // Next.js 的分包配置，可视为最佳实践
        splitChunks: (()=>{
            if (dev) {
                return false;
            }
            if (isNodeServer) {
                return {
                    filename: "[name].js",
                    chunks: "all",
                    minSize: 1000
                };
            }
            if (isEdgeServer) {
                return {
                    filename: "edge-chunks/[name].js",
                    minChunks: 2
                };
            }
            return {
                // Keep main and _app chunks unsplitted in webpack 5
                // as we don't need a separate vendor chunk from that
                // and all other chunk depend on them so there is no
                // duplication that need to be pulled out.
                chunks: (chunk)=>!/^(polyfills|main|pages\/_app)$/.test(chunk.name),
                cacheGroups: {
                    framework: {
                        chunks: "all",
                        name: "framework",
                        test (module1) {
                            const resource = module1.nameForCondition == null ? void 0 : module1.nameForCondition();
                            // topLevelFrameworkPaths: react, react-dom 以及它们的依赖
                            return resource ? topLevelFrameworkPaths.some((pkgPath)=>resource.startsWith(pkgPath)) : false;
                        },
                        priority: 40,
                        // Don't let webpack eliminate this chunk (prevents this chunk from
                        // becoming a part of the commons chunk)
                        enforce: true
                    },
                    lib: {
                        test (module1) {
                            return module1.size() > 160000 && /node_modules[/\\]/.test(module1.nameForCondition() || "");
                        },
                        name (module1) {
                            const hash = _crypto.default.createHash("sha1");
                            if (isModuleCSS(module1)) {
                                module1.updateHash(hash);
                            } else {
                                if (!module1.libIdent) {
                                    throw new Error(`Encountered unknown module type: ${module1.type}. Please open an issue.`);
                                }
                                hash.update(module1.libIdent({
                                    context: dir
                                }));
                            }
                            return hash.digest("hex").substring(0, 8);
                        },
                        priority: 30,
                        minChunks: 1,
                        reuseExistingChunk: true
                    }
                },
                maxInitialRequests: 25,
                minSize: 20000
            };
        })(),
        runtimeChunk: isClient ? {
            name: _constants1.CLIENT_STATIC_FILES_RUNTIME_WEBPACK
        } : undefined,
        minimize: !dev && (isClient || isEdgeServer),
        minimizer: [
            // Minify JavaScript
            (compiler)=>{
                // @ts-ignore No typings yet
                const { TerserPlugin  } = require("./webpack/plugins/terser-webpack-plugin/src/index.js");
                new TerserPlugin({
                    cacheDir: _path.default.join(distDir, "cache", "next-minifier"),
                    parallel: config.experimental.cpus,
                    swcMinify: config.swcMinify,
                    terserOptions: {
                        ...terserOptions,
                        compress: {
                            ...terserOptions.compress
                        },
                        mangle: {
                            ...terserOptions.mangle
                        }
                    }
                }).apply(compiler);
            },
            // Minify CSS
            (compiler)=>{
                const { CssMinimizerPlugin  } = require("./webpack/plugins/css-minimizer-plugin");
                new CssMinimizerPlugin({
                    postcssOptions: {
                        map: {
                            // `inline: false` generates the source map in a separate file.
                            // Otherwise, the CSS file is needlessly large.
                            inline: false,
                            // `annotation: false` skips appending the `sourceMappingURL`
                            // to the end of the CSS file. Webpack already handles this.
                            annotation: false
                        }
                    }
                }).apply(compiler);
            }
        ]
    }
}
