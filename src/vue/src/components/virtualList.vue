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
                @scrollToBottom="loadData()"
            >
                <p class="list-item" :style="{ color: item.color }">
                    <span style="font-size: 18px;font-weight: 700;">
                        {{item.index}}.&nbsp;
                    </span>
                    <span>{{item.value}}</span>
                </p>
            </component>
        </RouterView>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { fakerZH_CN as faker } from '@faker-js/faker'

/**
 * 博客原文地址：https://juejin.cn/post/6844903982742110216
 */
const data = ref([])
const route = useRouter().currentRoute
const routePath = computed(() => route.value.path)

watch(route, () => {
    loadData(30, true)
}, { immediate: true })

function loadData(count, first = false) {
    if (first) {
        data.value = []
    }

    count ||= 20
    const lastLen = data.value.length
    for (let i = 0; i < count; i++) {
        data.value.push({
            index: first ? i : (i + lastLen),
            id: faker.string.uuid(),
            color: faker.color.rgb(),
            value: routePath.value.endsWith('fixed') 
                ? faker.person.fullName()
                : faker.lorem.sentences()
        })
    }
}
</script>

<style scoped>
.page {
    height: 80vh;
    border: 1px solid #efefef;
}

.list-item {
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
}
</style>
