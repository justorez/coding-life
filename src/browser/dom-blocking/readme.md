# JS 和 CSS 是如何阻塞 DOM 解析和渲染的？

## 如何观察 DOM 何时解析完成？

使用开发者工具的 Performance 录制页面加载，观察 `DOMContentLoaded` 事件，该事件触发表示 DOM 已解析完成。

![](./img/dom.png)

注意区分「**解析**」和「**渲染**」。
