<template>
    <div>
        <h2>{{ clock }}</h2>
        <h2>state: {{store.state.num}}</h2>
        <h2>getter: {{store.getters.getNum}}</h2>
        <div style="margin-top: 0.83em;">
            <button @click="add">同步 +1</button>&nbsp;
            <button @click="asyncAdd">异步 +2</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import store from '../store'

const clock = ref(new Date().toLocaleString())
let timer = requestAnimationFrame(function tick() {
   clock.value = new Date().toLocaleString()
   timer = requestAnimationFrame(tick)
})

const add = () => store.commit('add')
const asyncAdd = () => store.dispatch('asyncAdd', 2)

onUnmounted(() => {
    cancelAnimationFrame(timer)
})
</script>
