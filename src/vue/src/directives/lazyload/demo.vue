<template>
    <div class="box box-imgs">
        <img v-for="item in imgList" :data-src="item" v-lazyload alt="" />
    </div>
</template>

<script>
import lazyload from './lazyload'
export default {
    directives: {
        lazyload
    },
    data() {
        return {
            imgList: [
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test1.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test2.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test3.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test4.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test5.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test6.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test7.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test8.jpg',
                'http://hilongjw.github.io/vue-lazyload/dist/avatar/test9.jpg'
            ]
        }
    }
}
</script>

<style scoped>
.box-imgs {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    border: 1px solid #efefef;
    background-color: #efefef;
    overflow-y: auto;
}
.box-imgs img {
    width: 60%;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 0px 5px 10px gray;
}
img.loading {
    height: 400px;
}
img.loading::before {
    content: '加载中';
}
</style>
