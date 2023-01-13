<template>
    <div class="box box-scroll">
        <div class="box-header">滚动缩放</div>
        <div class="box-content">
            <div v-zoom="{ maxZoom: 2 }">
                <div
                    class="page"
                    v-for="i in 5"
                    :key="i"
                    :style="{ color: utils.randomColor() }"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </div>
            </div>
        </div>
        <div class="box-footer"></div>
    </div>
</template>

<script>
import zoom from './zoom'
export default {
    directives: {
        zoom
    }
}
</script>

<style scoped>
.box-scroll {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 400px;
    border: 1px solid #efefef;
    background-color: #efefef;
}
.box-scroll .page {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
}
.box-scroll .page:last-child {
    margin-bottom: 0;
}

.box-content {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
}

.box-header,
.box-footer {
    height: 40px;
    background-color: #fff;
    z-index: 10;
}
.box-header {
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
.box-footer {
    border-top: 1px solid #ccc;
}
</style>
