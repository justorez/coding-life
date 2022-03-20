## 虚拟 DOM

```js
// Actual DOM
// [object HTMLDivElement]

// Virtual DOM
// { tag: 'div', data: { attrs: {}, ... }, children: [] }
```

- **虚拟 DOM 不会让框架变快**；
- 虚拟 DOM 节省资源。创建虚拟 DOM 要快得多，内存开销小得多；
- 声明式 DOM 结构；
- 抽离渲染逻辑。只要提供类 DOM API 和 JS 运行环境，就可以实现框架的跨终端渲染（比如 iOS/Android）；
- 虚拟 DOM 树更容易 diff，速度更快。 

## 函数式组件

即一个函数：不需要实例化（没有 `this`）、无状态（没有响应式数据）、没有生命周期。

在 3.x 中，有状态组件和函数式组件之间的性能差异已经大大减少，所以不必在为了性能使用函数式组件。

## 高阶组件

类似于装饰器，在不侵入原组件的情况下，对它的功能进行增强，返回一个新的组件。

- 保证原组件重用性；
- 易测试；
- 层级过深不易调试。

```js
function fetchURL(username, cb) {
    setTimeout(() => {
        cb('https://avatars3.githubusercontent.com/u/6128107?v=4&s=200')
    }, 500)
}

const Avatar = {
    props: ['src'],
    template: `<img :src="src"/>`
}

function withAvatarURL(InnerComponent) {
    return {
        props: ['username'],
        inheritAttrs: false,
        data() {
            return { url: null }
        },
        created() {
            fetchURL(this.username, (url) => this.url = url)
        },
        render(h) {
            return h(InnerComponent, {
                attrs: this.$attrs,
                props: {
                    src: this.url || 'http://via.placeholder.com/200x200'
                }
            })
        }
    }
}

const SmartAvatar = withAvatarURL(Avatar)
```

## 推荐阅读

- [Virtual DOM is Pure overhead](https://www.cnblogs.com/qianduanziyu/p/virtual-dom-is-pure-overhead.html)
