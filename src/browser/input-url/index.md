1. 浏览器的地址栏输入 URL 并按下回车。
    1. 检查输入的内容是否是一个合法的 URL 链接。
    2. 是，判断输入的 URL 是否完整。如果不完整，浏览器可能会对域进行猜测，补全前缀或者后缀。
    3. 否，将输入内容作为搜索条件，使用默认搜索引擎搜索。
2. 浏览器查找当前 URL 是否存在缓存，并比较缓存是否过期。
3. DNS 解析 URL 对应的 IP。
    1. 以 baidu.com 为例
    2. 操作系统检查浏览器缓存和本地的 hosts 文件
    3. 查找本地 DNS 解析器缓存
    4. 查找本地 DNS 服务器缓存
    5. 查询根 DNS 服务器，返回 .com 顶级域名服务器地址
    6. 查询顶级域名服务器，返回 baidu.com 权威域名服务器地址
    7. 查询权威域名服务器，返回 baidu.com ip 地址
4. 根据 IP 建立 TCP 连接（三次握手）。
    1. 客户端发送 SYN 包（SYN = 1, seq = x）到服务器，并进入 SYN_SEND 状态，等待服务器确认。
    2. 服务器收到 SYN 包，需要确认客户端的 SYN，同时自己也发送一个 SYN 包，即 SYN+ACK 包（SYN = 1, ACK = 1, seq = y, ack = x + 1），此时服务器进入 SYN_RECV 状态。
    3. 客户端收到服务器的 SYN+ACK 包，向服务器发送确认包 ACK（ACK = 1, seq = x + 1, ack = y + 1），此包发送完毕，客户端和服务器进入 ESTABLISHED 状态，完成三次握手。
5. HTTP/HTTPS 发起请求。
6. 服务器处理请求，浏览器接收 HTTP 响应。
    1. 如果是 301/302 状态码，则需要重定向，从 `Location` 响应头中读取地址，重新请求该地址。
    2. 200 状态码，检查响应类型 `Content-Type`，如果是 `text/html` 则开始渲染页面。
7. 渲染页面。
    1. 解析 HTML 构建 DOM 树。
    2. 遇到在线 CSS/JS 会下载资源文件，执行 JS。
    3. 解析 CSS 样式计算生成样式表（styleSheets）。
    5. 创建布局树，并计算元素的布局信息。
    6. 对布局树进行分层，并生成分层树。
    7. 为每个图层生成绘制列表，并将其提交到合成线程。
    8. 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
    9. 合成线程发送绘制图块命令 `DrawQuad` 给浏览器进程，浏览器绘制页面到屏幕上。
8. 关闭 TCP 连接（四次挥手）
    1. A 发送一个 FIN 包（FIN = 1, seq = x），进入 FIN_WAIT_1 状态，表示数据发送完毕。第一次挥手。
    2. B 收到 FIN 包后，回复一个 ACK 包（ACK = 1, seq = y, ack = x + 1），进入 CLOSE_WAIT 状态，A 进入 FIN_WAIT_2 状态。B 继续发送未发送完的数据，A 也可以继续接受数据。第二次挥手。
    3. B 发送一个 FIN 包（FIN = 1, ACK = 1, seq = z, ack = x + 1），进入 LAST_ACK 状态。第三次挥手。
    4. A 收到 FIN 后，回复一个 ACK 包（ACK = 1, seq = x + 1, ack = z + 1），进入 TIME_WAIT 状态，等待一段时间后进入 CLOSED 状态关闭连接，这是为了保证 B 可以收到 ACK 包，而 B 收到 ACK 包直接进入 CLOSED 状态关闭连接。第四次挥手。