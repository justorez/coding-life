> HTTP缓存中的ETag字段，[它是资源的特定版本的标识符，可以让缓存更高效，并节省带宽](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FETag "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag")。

## 一、定义及起源

ETag（Entity-Tag，下文简称：ETag）是[万维网](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FWorld_Wide_Web "https://en.jinzhao.wiki/wiki/World_Wide_Web")协议[HTTP](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FHypertext_Transfer_Protocol "https://en.jinzhao.wiki/wiki/Hypertext_Transfer_Protocol")的一部分，它是 HTTP 为[Web 缓存](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FWeb_cache "https://en.jinzhao.wiki/wiki/Web_cache")验证提供的多种机制之一，它允许客户端发出条件请求。这种机制允许缓存更有效并节省带宽，因为如果内容没有更改，Web 服务器不再需要发送完整的响应。

[ETag 是由 Web 服务器分配给在URL](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FUniform_Resource_Locator "https://en.jinzhao.wiki/wiki/Uniform_Resource_Locator")中找到的特定版本资源的不透明标识符。如果该 URL 的资源表示发生了变化，则会重新分配一个新的 ETag。ETag 类似于[指纹](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FFingerprint_(computing) "https://en.jinzhao.wiki/wiki/Fingerprint_(computing)")，可以快速进行比较以确定资源的两种表示是否相同。

ETag的正式提出是在 HTTP/1.1 协议的 [rfc7232](https://link.juejin.cn?target=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc7232%23section-2.3 "https://datatracker.ietf.org/doc/html/rfc7232#section-2.3") 文档中，引入 ETag 的目的主要是为了解决 [Last-Modified](https://link.juejin.cn?target=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc7232%23section-2.2 "https://datatracker.ietf.org/doc/html/rfc7232#section-2.2") 存在的一些问题：

1. 一些文件也许会周期性的更改，但是他的内容并不改变（仅仅改变的修改时间），这个时候我们并不希望客户端认为这个文件被修改了，而重新发起GET请求
2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，`If-Modified-Since`能检查到的粒度是s级的，这种修改无法判断（或者说UNIX记录MTIME只能精确到秒）
3. 某些服务器不能精确的得到文件的最后修改时间

HTTP/1.1协议虽然提出了 ETag，但并没有规定ETag的内容是什么或者说要怎么实现，唯一规定的是ETag的内容必须放在""内。

## 二、强校验和弱校验

ETag的格式为：`ETag= [ weak ] opaque-tag`，其中[ weak ]表示可选。ETag支持强校验和弱校验，它们的区别在于 ETag 标识符中是否存在一个初始的“W/”（即有无 [ weak ]），格式如下所示：

| 值                  | 类型          |
| ------------------ | ----------- |
| ETag="123456789"   | 强校验         |
| ETag=W/"123456789" | 弱校验（W大小写敏感） |

强校验 ETag 匹配表明两个资源表示的内容是逐字节相同的，并且所有其它实体字段（例如 Content-Language）也未更改。强 ETag 允许缓存和重组部分响应，就像[字节范围请求](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FByte_serving "https://en.jinzhao.wiki/wiki/Byte_serving")一样。

弱校验 ETag 匹配仅表明这两种表示在[语义上是等效](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FSemantic_equivalence "https://en.jinzhao.wiki/wiki/Semantic_equivalence")的，这意味着出于实际目的它们是可互换的并且可以使用缓存的副本。但是，资源表示不一定逐字节相同，因此弱 ETag 不适用于字节范围请求。弱 ETag 可能适用于 Web 服务器无法生成强 ETag 的情况，例如[动态生成的内容](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FDynamic_Web_page "https://en.jinzhao.wiki/wiki/Dynamic_Web_page")。

我们通过下面的例子来看看强、弱校验的匹配对比：

| ETag1 | ETag2 | 强校验 | 弱校验 |
| ----- | ----- | --- | --- |
| W/"1" | W/"1" | 不匹配 | 匹配  |
| W/"1" | W/"2" | 不匹配 | 不匹配 |
| W/"1" | "1"   | 不匹配 | 匹配  |
| "1"   | "1"   | 匹配  | 匹配  |

## 三、交互过程

ETag由服务器端生成，发送给客户端，客户端再次访问时通过传`If-None-Match`字段，服务端判断请求中的`If-None-Match`来验证资源是否修改。下面是协商缓存（ETag）的请求流程： ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bda5a4c9fe7444338f0c11226dbc47e7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

1. 客户端发起GET请求
2. 服务端接收、处理请求，返回Header值，里面包含ETag字段（如：ETag:"182ed89aac91e00e81c9b0c78de417f6"）
3. 此时客户端再次发送请求，该请求头中就会携带上 `If-None-Match`字段，值是ETag返回的内容（如：If-None-Match: "182ed89aac91e00e81c9b0c78de417f6"）。服务器判断发送过来的`If-None-Match`字段的值与服务端计算出来的ETag值是否匹配，如果匹配，则返回304状态码，此时服务端不返回任何实体数据，即body为空；否则返回200，同时会返回最新的资源和ETag值；

例如当我们多次访问百度首页时，在控制面板中可以看到部分资源返回状态码是 304，其中Request Headers 和 Response Headers 出现了 `ETag/If-None-Match` 字段，这说明该资源走的是协商缓存策略。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41ef8e7782fe46868d1421568bf31e15~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

以上就是协商缓存（ETag）的交互过程，接下来我们就来看看ETag的生成原理。

## 四、生成原理

虽然HTTP协议没有规定ETag的生成方法，但为了避免使用过期的缓存数据，用于生成 ETag 的方法应保证（尽可能）每个 ETag 是唯一的。生成的 ETag 常用方法包括使用资源内容[的抗冲突](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FCollision_resistance "https://en.jinzhao.wiki/wiki/Collision_resistance") [散列函数](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FHash_function "https://en.jinzhao.wiki/wiki/Hash_function")、最后修改时间戳的散列值或一个[修订号](https://link.juejin.cn?target=https%3A%2F%2Fen.jinzhao.wiki%2Fwiki%2FRevision_control "https://en.jinzhao.wiki/wiki/Revision_control")。

我们接下来介绍的是koa框架中ETag的生成原理，其它框架/服务器生成的方式可能不太一致，但我们只需要了解其实现思路即可。

```javascript
// https://github.com/koajs/ETag/blob/master/index.js

// 核心代码：生成ETag的函数（下面会具体分析）

const calculate = require('ETag')

// koa中间件，对ctx进行了处理

module.exports = function ETag (options) {

  return async function ETag (ctx, next) {

    await next()

    const entity = await getResponseEntity(ctx) // 获取body内容

    setETag(ctx, entity, options) // 生成ETag【重点】

  }

}

async function getResponseEntity (ctx) {

  // dosomething,最终返回body：return body

}

function setETag (ctx, entity, options) {

  if (!entity) return

  ctx.response.ETag = calculate(entity, options) // 生成ETag

}
```

```javascript
https://github.com/jshttp/ETag/blob/master/index.js

// 核心代码：生成ETag的函数（承接上面）

module.exports = ETag

var crypto = require('crypto')

var Stats = require('fs').Stats

var toString = Object.prototype.toString

/** 为非Stats类型创建ETag */

function entitytag (entity) {

  if (entity.length === 0) {

    // fast-path empty

    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"'

  }

  // compute hash of entity

  var hash = crypto.createHash('sha1').update(entity, 'utf8')

      .digest('base64').substring(0, 27)

  // compute length of entity

  var len = typeof entity === 'string'

    ? Buffer.byteLength(entity, 'utf8')

    : entity.length

  // 重点：长度(16进制)+hash(entity)值

  return '"' + len.toString(16) + '-' + hash + '"'

}

/** 生成ETag */

function ETag (entity, options) {

  // support fs.Stats object

  var isStats = isstats(entity)

  var weak = options && typeof options.weak === 'boolean' ? options.weak : isStats   

  // generate entity tag

  var tag = isStats ? stattag(entity) : entitytag(entity)

  // 弱ETag 比 强ETag 多了个 W/

  return weak ? 'W/' + tag : tag

}

/** 确定对象是否是 Stats 类型 */

function isstats (obj) {

  // genuine fs.Stats

  if (typeof Stats === 'function' && obj instanceof Stats) {

    return true

  }

  // quack quack

  return obj && typeof obj === 'object' &&

    'ctime' in obj && toString.call(obj.ctime) === '[object Date]' &&

    'mtime' in obj && toString.call(obj.mtime) === '[object Date]' &&

    'ino' in obj && typeof obj.ino === 'number' &&

    'size' in obj && typeof obj.size === 'number'

}

/** 为 Stats 类型创建ETag */

function stattag (stat) {

  var mtime = stat.mtime.getTime().toString(16)

  var size = stat.size.toString(16)

  // 重点：文件大小的16进制+修改时间

  return '"' + size + '-' + mtime + '"'

}
```

以上就是 ETag 的生成原理，总结如下：

1. **对于静态文件（如css、js、图片等），ETag的生成策略是：文件大小的16进制+修改时间**

2. **对于字符串或Buffer，ETag的生成策略是：字符串/Buffer长度的16进制+对应的hash值**

## 五、如何生效

上面代码介绍了如何生成ETag，如果想让生成的ETag生效，还需要用到另一个koa中间件：[koa-conditional-get](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fkoa-conditional-get "https://www.npmjs.com/package/koa-conditional-get")，该中间件核心源码如下：

```javascript
// https://github.com/koajs/conditional-get/blob/master/index.js

module.exports = function conditional () {
  return async function (ctx, next) {
    await next()

    // 调用 ctx 上的fresh属性
    if (ctx.fresh) { 
      ctx.status = 304
      ctx.body = null
    }
  }
}
```

上面的代码中，我们看到[koa-conditional-get](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fkoa-conditional-get "https://www.npmjs.com/package/koa-conditional-get")中间件实际上调用了 ctx 上的fresh属性，如果该属性返回 true ，则将状态码重置为304，同时清空body。我们接着看 ctx.fresh 属性是怎么进行判断的，代码如下：

```js
// https://github.com/koajs/koa/blob/master/lib/request.js

// ctx中fresh属性如下

const fresh = require('fresh') // 真正判断的函数

get fresh () {
    const method = this.method
    const s = this.ctx.status

    // GET or HEAD for weak freshness validation only
    if (method !== 'GET' && method !== 'HEAD') return false

    // 2xx or 304 as per rfc2616 14.26
    if ((s >= 200 && s < 300) || s === 304) {

      return fresh(this.header, this.response.header) // 重点

    }

    return false
}
```

ctx.fresh 属性的核心内容是引入了第三方库（fresh）来判断资源是否足够新鲜，fresh库的核心代码如下：

```js
// https://github.com/jshttp/fresh/blob/master/index.js

// fresh 核心代码如下

module.exports = fresh

function fresh (reqHeaders, resHeaders) {

  // fields

  var modifiedSince = reqHeaders['if-modified-since']

  var noneMatch = reqHeaders['If-None-Match']

  // unconditional request

  if(!modifiedSince && !noneMatch) {

    return false

  }

  // Always return stale when Cache-Control: no-cache

  // to support end-to-end reload requests

  // https://tools.ietf.org/html/rfc2616#section-14.9.4

  var cacheControl = reqHeaders['cache-control']

  if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {

    return false

  }

  // If-None-Match

  if (noneMatch && noneMatch !== '*') {

    var ETag = resHeaders['ETag']

    if (!ETag) {

      return false

    }

    var ETagStale = true

    var matches = parseTokenList(noneMatch)

    for (var i = 0; i < matches.length; i++) {

      var match = matches[i]

      if (match === ETag || match === 'W/' + ETag || 'W/' + match === ETag) {

        ETagStale = false

        break

      }

    }

    if (ETagStale) {

      return false

    }

  }

  // if-modified-since

  if (modifiedSince) {

    var lastModified = resHeaders['last-modified']

    var modifiedStale = !lastModified || !(parseHttpDate(lastModified) <= parseHttpDate(modifiedSince))

    if (modifiedStale) {

      return false

    }

  }

  return true

}

```

根据源码，将fresh函数的代码判断逻辑进行了整理，总结如下。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f10ad48e2c2046deb59c1dacf9453d38~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

只要满足右边紫色部分的判断条件之一，fresh即为true。需要注意的是，判断条件的优先级是从上到下，即如果`ETag`和`Last-Modified`字段同时存在，**ETag的优先级更高**。

## 六、ETag 实战

上一节中我们分析了如何让ETag策略生效，加下来我们将通过一个例子来更加直观的了解ETag：

```js
const Koa = require('koa')
const etag = require('koa-etag')
const conditional = require('koa-conditional-get')

const app = new Koa()

// 放在 use(etag) 上面
app.use(conditional())

// 使用 etag
app.use(etag())

// 请求响应
app.use(async function (ctx, next) {
    await next()

    ctx.body = {
        name: 'tobi',

        species: 'ferret',

        age: 2
    }
})

app.listen(3000, () => console.log('port 3000'))
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff725714fe57457da4330284eda8e205~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0df9c5e119774661934795879fbdda3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

从上图中的访问结果来看，ETag策略已生效。我们这里只给出了最基础的用法，其它用法可根据业务进行调整。

## 七、总结

本文首先介绍了ETag的基本定义，它是资源的特定版本的标识符，可以让缓存更高效，并节省带宽；接下来讲述了ETag的起源、验证类型以及服务端与客户端的交互流程；最后，我们通过koa-[ETag](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fkoajs%2FETag%2Fblob%2Fmaster%2Findex.js "https://github.com/koajs/ETag/blob/master/index.js")库的源码具体分析了ETag的生成原理及实战应用，让我们对Etag有了更加直观、清晰的认识。

ETag的提出主要是为了解决Last-Modified验证机制存在的一些问题，但ETag也并非完美，在传统意义上，ETag 只能在单个服务器提供内容的网站上使用，对于像 Apache（2.4版本以下） 或 IIS 等多服务器提供资源的网站，ETag则无法正常工作。此时需要单独对Etag进行配置，请参考 [Apache ETag](https://link.juejin.cn?target=https%3A%2F%2Fhttpd.apache.org%2Fdocs%2F2.4%2Fmod%2Fcore.html "https://httpd.apache.org/docs/2.4/mod/core.html") 和 [IIS ETag](https://link.juejin.cn?target=https%3A%2F%2Faspisfun.com%2Fblog%2Fadding-entity-tags-etags-to-iis-for-faster-loading%2F "https://aspisfun.com/blog/adding-entity-tags-etags-to-iis-for-faster-loading/")。

不同服务器对ETag的生成策略不尽相同，如果你的请求中返回的ETag值与本文的格式不一致，这是正常现象；如果你想自定义ETag生成算法，可以直接在上述的源码中进行修改，其它服务器请参考 [Nginx](https://link.juejin.cn?target=https%3A%2F%2Fblog.csdn.net%2Fz529905310%2Farticle%2Fdetails%2F78305028 "https://blog.csdn.net/z529905310/article/details/78305028")、[Apache](https://link.juejin.cn?target=https%3A%2F%2Fwww.jb51.cc%2Fnginx%2F434822.html "https://www.jb51.cc/nginx/434822.html")。

## 八、附录

1. [koa/etag](https://github.com/koajs/etag)
2. [koa/conditional-get](https://github.com/koajs/conditional-get/blob/master/index.js)
3. [koa/request.js](https://github.com/koajs/koa/blob/master/lib/request.js)
4. [jshttp/fresh](https://github.com/jshttp/fresh/blob/master/index.js)
5. [RFC7232-ETag](https://datatracker.ietf.org/doc/html/rfc7232#section-2.3)
6. [http缓存中etag的生成原理](https://www.cnblogs.com/yalong/p/15207547.html)
7. [轻松理解浏览器缓存（Koa缓存源码解析）](https://juejin.cn/post/6844904133024022536#heading-19)


