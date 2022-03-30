# Cross Site Request Forgery

利用用户的登录状态和服务器漏洞干坏事。

## 攻击示例

黑客知晓了 <https://bank.com> 的转账接口，当用户已登录该网站时，遇到下面的情况，用户的软妹币就被转到了黑客账户上了。

### 1.自动 Get 请求

```html
<img src="https://bank.com/sendcoin?user=hacker&number=1000">
```

当页面加载时，浏览器自动发起 `img-src` 请求。

### 2.自动 Post 请求

```html
<form id='hacker-form' action="https://bank.com/sendcoin" method=POST>
    <input type="hidden" name="user" value="hacker" />
    <input type="hidden" name="number" value="1000" />
</form>
<script>
    document.getElementById('hacker-form').submit();
</script>
```

### 3.引诱用户点击链接

```html
<div>
  <img width=150 src=http://images.xuejuzi.cn/1612/1_161230185104_1.jpg> </img> </div> <div>
  <a href="https://bank.com/sendcoin?user=hacker&number=100" taget="_blank">
    点击下载美女照片
  </a>
</div>
```

## 如何防护

1. [Cookie SameSite](https://web.dev/samesite-cookies-explained/)
    - Strict：浏览器完全禁止第三方 Cookie
    - Lax：仅允许从第三方站点链接打开和第三方站点提交 Get 方式的表单，这两种方式会携带 Cookie
    - None：无限制
2. 服务端验证请求的来源站点：优先校验 `origin`，酌情使用 `referer`（`referer` 暴露用户浏览历史，涉及隐私问题）。
3. CSRF Token：服务端生成 CSRF Token 并返回给页面，发起请求需要带上 Token，由服务端校验 Token 是否合法。
    ```html
    <form action="https://bank.com/sendcoin" method="POST">
        <input type="hidden" name="csrf-token" value="nc98P987bcpncYhoadjoiydc9ajDlcn">
        <input type="text" name="user">
        <input type="text" name="number">
        <input type="submit">
    </form>
    ```
