<template>
    <div
        ref="list"
        class="infinite-list-container"
        @scroll="scrollEvent($event)"
    >
        <div
            class="infinite-list-phantom"
            :style="{ height: listHeight + 'px' }"
        ></div>
        <div class="infinite-list" :style="{ transform: getTransform }">
            <div
                ref="items"
                class="infinite-list-item"
                v-for="item in visibleData"
                :key="item.id"
                :style="{
                    height: itemSize + 'px',
                    // lineHeight: itemSize + 'px'
                }"
            >
                <slot ref="slot" :item="item"></slot>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 虚拟列表：固定高度
 */
export default {
    name: 'VirtualList',
    props: {
        // 所有列表数据
        listData: {
            type: Array,
            default: () => []
        },
        // 每项高度
        itemSize: {
            type: Number,
            default: 200
        }
    },
    data() {
        return {
            screenHeight: 0, // 可视区域高度
            startOffset: 0, // 偏移量
            start: 0, // 起始索引
            end: null // 结束索引
        }
    },
    computed: {
        // 列表总高度
        listHeight() {
            return this.listData.length * this.itemSize
        },
        // 可显示的列表项数
        visibleCount() {
            return Math.ceil(this.screenHeight / this.itemSize)
        },
        // 偏移量对应的 style
        getTransform() {
            return `translate3d(0, ${this.startOffset}px, 0)`
        },
        // 获取真实显示列表数据
        visibleData() {
            return this.listData.slice(
                this.start,
                Math.min(this.end, this.listData.length)
            )
        }
    },
    mounted() {
        // this.$el：组件实例管理的 DOM 根节点
        // 如果首行加了行注释，$el 是注释文本节点，所以最好别用，可能取错值
        this.screenHeight = this.$refs.list.clientHeight
        this.start = 0
        this.end = this.start + this.visibleCount
    },
    methods: {
        scrollEvent() {
            // 当前滚动位置
            let scrollTop = this.$refs.list.scrollTop
            // 此时的开始索引
            this.start = Math.floor(scrollTop / this.itemSize)
            // 此时的结束索引
            this.end = this.start + this.visibleCount
            // 此时的偏移量
            // 偏移量：滚动条滚动后，将可视区外的渲染内容偏移到可视区内
            // 模拟滚动效果的关键点：如果相对滚动距离小于 itemSize 是不需要额外偏移量的，
            // 让滚动条控制滚动即可，营造一种滚动上去了的感觉
            this.startOffset = scrollTop - (scrollTop % this.itemSize)

            if (this.end >= this.listData.length) {
                this.$emit('scrollToBottom')
            }
        }
    }
}
</script>

<style scoped>
.infinite-list-container {
    position: relative;
    height: 100%;
    overflow: auto;
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
    text-align: center;
}
</style>
