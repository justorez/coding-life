# Server-Sent Events

## 一、SSE 的本质

使用流消息（`Content-Type: text/event-stream`）向浏览器推送消息。

## 二、SSE 的特点

- SSE 单向通信。WS 双向通信。
- SSE 兼容性更好。SSE 使用 HTTP 协议，现有的服务器软件都支持。WS 是一个独立协议。
- SSE 属于轻量级，使用简单；WS 协议相对复杂。
- SSE 默认支持断线重连，WS 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WS 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。

## 相关资料

- [阮一峰：Server-Sent Events 教程](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
- [MDN：使用服务器发送事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events)
