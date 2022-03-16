# Cross Site Scripting

## 危害

1. 窃取 Cookie：`document.cookie` 获取 cookie，ajax/fetch + CORS 将数据发送给攻击者服务器。攻击者可在其他电脑上模拟用户登录。
2. 监听用户行为：监听键盘事件，获取用户输入的信用卡等信息。
3. 修改 DOM：伪造登录窗口，获取用户名和密码。
4. 在页面内生产浮窗广告。
5. ......

## 如何注入

1. 存储型：利用站点漏洞将恶意代码提交到网站数据库中。
2. 反射型：用户发送给网站的请求中被拼接了恶意代码，随后网站又将恶意代码随页面返回给用户。邮件和聊天群的恶意链接也有这种。
3. 基于 DOM：在 Web 资源传输过程或者用户使用页面的过程中修改 Web 页面的数据。比如 WiFi 路由器劫持、本地恶意软件劫持。

## 如何防护

1. 服务端过滤掉脚本内容、对脚本相关的特殊字符转义。
2. 严格内容安全策略 [CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
    - 限制加载其他域下的资源文件
    - 禁止向第三方域提交数据
    - 禁止执行内联脚本和未授权脚本
    - 上报机制
3. 设置 HttpOnly：禁止客户端读写 cookie