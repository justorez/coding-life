<template>
    <div class="box box-flex">
        <span class="intro-1">娱乐</span>
        <span class="intro-2">经济</span>
        <span class="intro-3">文化</span>
        <span class="intro-4">军事</span>
    </div>

    <intro :selector="selector" @click-item="changeIntroItem"></intro>
</template>

<script>
import intro from './intro.vue'

export default {
    components: {
        intro
    },
    data() {
        return {
            selector: '.intro-1'
        }
    },
    methods: {
        changeIntroItem() {
            let index = Number(this.selector.slice(-1)) + 1
            index = index > 4 ? 1 : index
            this.selector = `.intro-${index}`
        }
    }
}
</script>

<style scoped>
.box {
    margin-bottom: 20px;
}

.box:last-child {
    margin-bottom: 0;
}

.box-flex {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 300px;
}

.box-flex span {
    flex: 0 0 33.33%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 0 solid var(--color-border);
    border-bottom-width: 1px;
    border-right-width: 1px;
}
.box-flex span:nth-child(-n+3) {
    border-top-width: 1px;
}
.box-flex span:nth-child(3n+1) {
    border-left-width: 1px;
}
</style>
