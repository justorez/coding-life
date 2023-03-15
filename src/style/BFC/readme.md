> [MDN: Block Formatting Context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

BFC 的用处：
1. 包含内部浮动：让浮动内容和周围的内容等高。
2. 排除外部浮动：正常文档流中建立的 BFC 不得与元素本身所在的块格式化上下文中的任何浮动的外边距重叠。
3. 阻止外边距重叠：创建新的 BFC 避免两个相邻元素之间的外边距重叠 。
