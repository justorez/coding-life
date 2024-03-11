<template>
    <div class="page">
        <RouterView v-slot="{ Component }">
            <component 
                v-if="data && data.length"
                :is="Component"
                :listData="data" 
                :itemSize="100"
                :estimatedItemSize="100"
                v-slot="{ item }" 
            >
                <p class="list-item" :style="{ color: utils.randomColor() }">
                    <span style="font-size: 18px;font-weight: 700;">{{item.id}}.</span>{{item.value}}
                </p>
            </component>
        </RouterView>
    </div>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import faker from 'faker'

/**
 * 博客原文地址：https://juejin.cn/post/6844903982742110216
 */
const data = ref([])
const route = useRoute()

watchEffect(() => {
    // const path = route.path
    data.value = []
    for (let i = 0; i < 1000; i++) {
        data.value.push({ 
            id: i, 
            value: route.path.endsWith('fixed') ? i : faker.lorem.sentences()
        })
    }
})
</script>

<style scoped>
.page {
    height: 80vh;
    border: 1px solid #efefef;
}

.list-item {
    padding: 5px;
    box-sizing: 'border-box';
    border-bottom: 1px solid #efefef;
}
</style>
