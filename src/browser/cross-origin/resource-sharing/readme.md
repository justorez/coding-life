# [跨域资源共享](https://ruanyifeng.com/blog/2016/04/cors.html)

## 简单请求

同时满足下面两种条件：

1. 请求方法只能是：
    - HEAD
    - GET
    - POST
2. 请求头不超出以下几种字段：
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
