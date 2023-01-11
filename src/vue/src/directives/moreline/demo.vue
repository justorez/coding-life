<template>
    <div class="box box-text">
        <span class="tmp" v-moreline="2">
            JavaScript 编程语言允许你在 Web 页面上实现复杂的功能。
            如果你看到一个网页不仅仅显示静态的信息，而是显示依时间更新的内容，或者交互式地图，
            或者 2D/3D
            动画图像，或者滚动的视频播放器，等等——你基本可以确定，这需要
            JavaScript 的参与。
        </span>
    </div>
</template>

<script>
import moreline from './moreline'
export default {
    directives: {
        moreline
    }
}
</script>

<style scoped></style>
