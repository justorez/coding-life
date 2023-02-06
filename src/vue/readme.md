## 虚拟 DOM

```js
// Actual DOM
// [object HTMLDivElement]

// Virtual DOM
// { tag: 'div', data: { attrs: {}, ... }, children: [] }
```

### 更新页面的性能比较

| innerHTML | 虚拟 DOM | 原生 JS |
| - | - | - |
| 心智负担中等 | 心智负担小 | 心智负担大 |
| 可维护性差 | 可维护性强 | 可维护性差 |
| 性能差 | 性能不错 | 性能高 |

所以虚拟 DOM 是性能和可维护性之间的权衡。

- **不会让框架变快！甚至更慢**。但保证了性能的下限。
- 声明式，产出的代码更易维护。
- 使 diff 的性能消耗最小化，尽可能复用节点，尽可能减少直接对 DOM 操作。DOM 节点是重量级对象，创建、甚至读取属性都是大开销。
- 抽离渲染逻辑。只要提供类 DOM API 和 JS 运行环境，就可以实现框架的跨终端渲染（比如 iOS/Android）。
- 我们很难写出绝对优化的命令式代码。

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
