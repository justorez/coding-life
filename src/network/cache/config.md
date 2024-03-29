HTTP 缓存配置的最佳实践为以下两条：

1. 文件路径中带有 hash 值：一年的强缓存。因为该文件的内容发生变化时，会生成一个带有新的 hash 值的 URL。前端将会发起一个新的 URL 的请求。配置响应头 `Cache-Control: public,max-age=31536000,immutable`
2. 文件路径中不带有 hash 值：协商缓存。大部分为 public 下文件。配置响应头 `Cache-Control: no-cache` 与 `etag/last-modified`

但是当处理永久缓存时，切记不可打包为一个大的 `bundle.js`，此时一行业务代码的改变，将导致整个项目的永久缓存失效，需要按代码更新频率分为多个 `chunk` 进行打包，细粒度的控制缓存。

![](./img/cache.png)

1. webpack-runtime: webpack 的版本比较稳定，分离出来，保证长久的强缓存
2. react/react-dom: react 的版本更新频次也较低
3. vendor: 常用的第三方模块打包在一起，如 lodash，classnames 基本上每个页面都会引用到，但是它们的更新频率会更高一些。另外对低频次使用的第三方模块不要打进来
4. pageA: A 页面，当 A 页面的组件发生变更后，它的缓存将会失效
5. pageB: B 页面
6. echarts: 不常用且过大的第三方模块单独打包
7. mathjax: 不常用且过大的第三方模块单独打包
8. jspdf: 不常用且过大的第三方模块单独打包

Webpack5 配置参考：

```js
{
  // Automatically split vendor and commons
  // https://twitter.com/wSokra/status/969633336732905474
  // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
  splitChunks: {
    chunks: 'all',
  },
  // Keep the runtime chunk separated to enable long term caching
  // https://twitter.com/wSokra/status/969679223278505985
  // https://github.com/facebook/create-react-app/issues/5358
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`,
  },
}
```

Nginx 配置参考：

```nginx
server {
    listen       80;
    server_name  localhost;
 
    root   /usr/share/nginx/html;
    index  index.html index.htm;
 
    location / {
        # 解决单页应用服务端路由的问题
        try_files  $uri $uri/ /index.html;
 
        # 非带 hash 的资源，需要配置 Cache-Control: no-cache，避免浏览器默认为强缓存
        expires -1;
    }
 
    location /static {
        # 带 hash 的资源，需要配置长期缓存
        expires 1y;
    }
}
```
