<template>
    <div class="page">
        <component 
            v-if="data && data.length"
            :is="Views[type]"
            :listData="data" 
            :itemSize="100"
            :estimatedItemSize="100"
            v-slot="{ item }" 
        >
            <p class="list-item" :style="{ color: utils.randomColor() }">
                <span style="font-size: 18px;font-weight: 700;">{{item.id}}.</span>{{item.value}}
            </p>
        </component>
    </div>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import faker from 'faker'
import fixed from './fixed.vue'
import dynamic from './dynamic.vue'

/**
 * 博客原文地址：https://juejin.cn/post/6844903982742110216
 */
const props = defineProps({
    type: {
        type: String,
        default: 'fixed' // fixed | dynamic
    }
})
const Views = { fixed, dynamic }
const data = ref([])

watchEffect(() => {
    data.value = []
    for (let i = 0; i < 1000; i++) {
        data.value.push({ 
            id: i, 
            value: props.type === 'fixed' ? i : faker.lorem.sentences()
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
