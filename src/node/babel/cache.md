# babel-loader cache 原理

https://github.com/babel/babel-loader/blob/master/src/cache.js

```js
// Build the filename for the cached file
const filename = function (source, identifier, options) {
    const hash = crypto.createHash('md4')
    const contents = JSON.stringify({ source, options, identifier })
    hash.update(contents)
    return hash.digest('hex') + '.json'
}

const handleCache = async function (directory, params) {
    // 1. 生成缓存文件路径
    // 2. 如果缓存文件可以读取到，则直接返回
    // 3. 创建缓存目录
    // 4. 转换源码并放回结果，同时写入到缓存文件
}
```

-   `source` 源码
-   `options` 配置
-   `identifier` 缓存唯一标识。默认使用 `@babel/core` 的版本号，如果你升级了 babel，原缓存都会失效。

`babel-loader` 中使用 [`md4`](https://en.wikipedia.org/wiki/MD4) 对文件做哈希。其实最早是使用 [`sha-1`](https://zh.wikipedia.org/wiki/SHA-1)，不过实际用不到那么高强度的算法（`sha-1` 使用 80 轮 160 位，`md4` 使用 3 轮 128 位，具体可参考 [wiki](https://en.wikipedia.org/wiki/Comparison_of_cryptographic_hash_functions) ），`sha-1` 比 `md4` 慢的多，所以在一次 [pr](https://github.com/babel/babel-loader/commit/2be502dcd86df940ffafdc3738eff6f876ba91b0#diff-93327db2f0a6f8df9f3d6f9959bbcc80) 中改成了 `md4` 校验。

