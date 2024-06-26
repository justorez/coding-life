<template>
    <div
        ref="list"
        :style="{ height }"
        class="infinite-list-container"
        @scroll="scrollEvent($event)"
    >
        <div ref="phantom" class="infinite-list-phantom"></div>
        <div ref="content" class="infinite-list">
            <div
                class="infinite-list-item"
                ref="items"
                v-for="item in visibleData"
                :id="item._index"
                :key="item.id"
            >
                <slot ref="slot" :item="item.item"></slot>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 虚拟列表：动态高度，以预估高度先行渲染，然后获取真实高度并缓存
 */
export default {
    name: 'VirtualList',
    props: {
        // 所有列表数据
        listData: {
            type: Array,
            default: () => []
        },
        // 预估高度
        estimatedItemSize: {
            type: Number,
            required: true
        },
        // 缓冲区比例
        bufferScale: {
            type: Number,
            default: 1
        },
        // 容器高度 100px or 50vh
        height: {
            type: String,
            default: '100%'
        }
    },
    data() {
        return {
            positions: [], // 列表子元素的位置信息：索引、高度、
            screenHeight: 0, // 可视区域高度
            start: 0, // 起始索引
            end: 0 // 结束索引
        }
    },
    computed: {
        _listData() {
            return this.listData.map((item, index) => {
                return {
                    _index: `_${index}`,
                    item
                }
            })
        },
        visibleCount() {
            return Math.ceil(this.screenHeight / this.estimatedItemSize)
        },
        aboveCount() {
            return Math.min(this.start, this.bufferScale * this.visibleCount)
        },
        belowCount() {
            return Math.min(
                this.listData.length - this.end,
                this.bufferScale * this.visibleCount
            )
        },
        // 真实渲染的数据，包括不可见的上部缓冲区和下部缓冲区
        visibleData() {
            let start = this.start - this.aboveCount
            let end = this.end + this.belowCount
            return this._listData.slice(start, end)
        }
    },
    created() {
        this.$watch(
            () => this.listData.length,
            () => this.initPositions(),
            { immediate: true }
        )
    },
    mounted() {
        this.screenHeight = this.$el.clientHeight
        this.start = 0
        this.end = this.start + this.visibleCount
    },
    updated() {
        this.$nextTick(() => {
            if (!this.$refs.items || !this.$refs.items.length) {
                return
            }
            // 获取真实元素大小，修改对应的尺寸缓存
            this.updateItemsSize()
            // 更新列表总高度
            const lastNode = this.positions[this.positions.length - 1]
            if (!lastNode) return
            this.$refs.phantom.style.height = lastNode.bottom + 'px'
            // 更新真实偏移量
            this.setStartOffset()
        })
    },
    methods: {
        initPositions() {
            this.positions = this.listData.map((_, index) => {
                const pos = this.positions[index] || {
                    index,
                    height: this.estimatedItemSize,
                    top: index * this.estimatedItemSize,
                    bottom: (index + 1) * this.estimatedItemSize
                }
                return pos
            })
        },
        // 获取列表项的当前尺寸
        updateItemsSize() {
            let nodes = this.$refs.items
            nodes.forEach((node) => {
                let { height } = node.getBoundingClientRect()
                let index = Number(node.id.slice(1))
                if (!this.positions[index]) {
                    return
                }
                let oldHeight = this.positions[index].height
                let dValue = oldHeight - height
                // 存在差值
                if (dValue) {
                    this.positions[index].bottom -= dValue
                    this.positions[index].height = height
                    for (let k = index + 1; k < this.positions.length; k++) {
                        this.positions[k].top = this.positions[k - 1].bottom
                        this.positions[k].bottom -= dValue
                    }
                }
            })
        },
        // 获取当前的偏移量
        setStartOffset() {
            let startOffset
            if (this.start >= 1) {
                let size =
                    this.positions[this.start].top -
                    (this.positions[this.start - this.aboveCount]
                        ? this.positions[this.start - this.aboveCount].top
                        : 0)
                startOffset = this.positions[this.start - 1].bottom - size
            } else {
                startOffset = 0
            }
            this.$refs.content.style.transform = `translate3d(0, ${startOffset}px, 0)`
        },
        // 滚动事件
        scrollEvent() {
            // 当前滚动位置
            let scrollTop = this.$refs.list.scrollTop
            // 此时的开始索引
            this.start = this.getStartIndex(scrollTop)
            // 此时的结束索引
            this.end = this.start + this.visibleCount
            // 此时的偏移量
            this.setStartOffset()

            if (this.end + 1 >= this.listData.length) {
                this.$emit('scrollToBottom')
            }
        },
        // 获取列表起始索引
        getStartIndex(scrollTop = 0) {
            // return this.positions.find(p => p && p.bottom > scrollTop).index
            return this.binarySearch(this.positions, scrollTop)
        },
        // 二分法查找
        binarySearch(list, value) {
            let start = 0
            let end = list.length - 1
            let tempIndex = null

            while (start <= end) {
                let midIndex = parseInt((start + end) / 2)
                let midValue = list[midIndex].bottom
                if (midValue === value) {
                    return midIndex + 1
                } else if (midValue < value) {
                    start = midIndex + 1
                } else if (midValue > value) {
                    if (tempIndex === null || tempIndex > midIndex) {
                        tempIndex = midIndex
                    }
                    end = end - 1
                }
            }
            return tempIndex
        }
    }
}
</script>

<style scoped>
.infinite-list-container {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
}

.infinite-list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
