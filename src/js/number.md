## `Number`

IEEE 754 双精度 64 位浮点数标准：$V = (-1)^{sign} \cdot (1 + mantissa) \cdot 2^{exponent}$

### 指数范围

指数域 11 位，最大表示范围 0~2047。其中全 0 和全 1 的 0 和 2047 被用作特殊值，故取 1023 为中间值，大于 1023 为正数，反之为负数。

所以取值范围为：(1-1023)~(2046-1023) 即 -1022~1023。

### `Number.EPSILON`

尾数 52 位，因此尾数的精度是 $2^{-52}$，即 `Number.EPSILON`。

### `Number.MAX_VALUE`

尾数全部取 1，指数取最大值 1023：

$\begin{aligned}
1.111...\times 2^{1023} &= (2^{53}-1) \times 2^{971} \\
&= Number.{MAX}\underline{~}{VALUE}
\end{aligned}$

### `Number.MAX_SAFE_INTEGER`

尾数 52 位，所以当指数大于 52 时，将无法精确表示该数，因为有效数值位可能会被截掉。

即 $Number.{MAX}\underline{~}{SAFE}\underline{~}{INTEGER} = 2^{53} - 1$

验证：`Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2`


## 参考
- [MDN Number 编码](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_%E7%BC%96%E7%A0%81)
- [JS 中的 MAX_VALUE 和 MAX_SAFE_INTEGER 是怎么来的](https://juejin.cn/post/6844904175000616967)
