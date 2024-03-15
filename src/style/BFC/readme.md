> [MDN: Block Formatting Context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

BFC 的用处：
1. 包含内部浮动：让浮动内容和周围的内容等高。
2. 排除外部浮动：正常文档流中建立的 BFC 不得与元素本身所在的 BFC 中的任何浮动的外边距重叠。
3. 阻止[外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)：创建新的 BFC 避免两个相邻元素之间的外边距重叠 。

如何创建 BFC：
1. `float` 不为 `none`
2. `position` 为 `absolute` 或 `fixed`
3. `display` 为 `inline-block`、`table-cell`、`table-caption` 等
4. `overflow` 为 `auto`、`scroll` 或 `hidden`
5. Flexbox 或 Grid 的直接子元素
